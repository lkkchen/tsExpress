import 'reflect-metadata'
import * as express from 'express'
import * as moment from 'moment'
import {
    Application,
    Express,
} from 'express';

import * as bodyParser from 'body-parser'
import {loadController, LoadControllerResult} from "./src/libs/controller_loader";
import {loadMiddleware, MiddlewareMap} from "./src/libs/middleware_loader";


class TsExpressApplication {
    app: Application;
    middlewareDataMap: MiddlewareMap;
    config: object;

    constructor(config: object) {
        this.config = config;
    }

    async loadBodyParser(){
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json({limit: "10mb"}));
    }

    async setStaticDir(path, dirPath){
        this.app.use(path, express.static(__dirname + dirPath))
    }

    async loadMiddlewareDataMap(){
        this.middlewareDataMap = await loadMiddleware();
        console.log(this.middlewareDataMap);
    }

    async loadRoutes(){
        this.app.use(this.middlewareDataMap.get("crossOrigin").func);

        const controllerList: Array<LoadControllerResult> = await loadController();
        const router = express.Router();
        console.log(controllerList);
        for(const controller of controllerList){

            const middlewareFuncList = [];
            for(const middlewareName of controller.middlewareNames){
                const theMiddleware = this.middlewareDataMap.get(middlewareName);
                if(theMiddleware) middlewareFuncList.push(theMiddleware.func);
            }

            if(middlewareFuncList.length){
                router[controller.method](controller.path, middlewareFuncList, controller.func);
            }else{
                router[controller.method](controller.path, controller.func);
            }
        }
        this.app.use(router);

        this.app.use(this.middlewareDataMap.get("resultHandler").func);
        this.app.use(this.middlewareDataMap.get("notFoundHandler").func)
    }

    async start(){
        this.app = express();
        await this.loadBodyParser();
        await this.setStaticDir("/static", "/public");
        await this.loadMiddlewareDataMap();
        await this.loadRoutes();

        const port = 8080;
        this.app.listen(port,() => {
            console.log(`TsExpressApplication Started At: http://localhost:${port}...`);
        })
    }
}

const App = new TsExpressApplication({});
App.start().catch();

