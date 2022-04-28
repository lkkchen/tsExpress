import * as express from 'express'
import {
    Application,
    RequestHandler
} from 'express';

import * as bodyParser from 'body-parser'
import {loadController, LoadControllerResult} from "../loaders";
import {loadMiddleware, MiddlewareMap} from "../loaders";
import {TsExpressApplicationConfig, TsResultHandlerFunc} from "../interface"


export class TsExpressApplication {
    app: Application;
    middlewareDataMap: MiddlewareMap;

    interceptors: Array<RequestHandler> = [];
    resultHandler: TsResultHandlerFunc = function () {};

    constructor(config?: TsExpressApplicationConfig) {
        if(config && config.interceptors) this.interceptors = config.interceptors;
        if(config && config.resultHandler) this.resultHandler = config.resultHandler;
    }

    async loadBodyParser() {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json({limit: "10mb"}));
    }

    async setStaticDir(path, dirPath) {
        this.app.use(path, express.static(__dirname + dirPath))
    }

    async loadMiddlewareDataMap() {
        this.middlewareDataMap = await loadMiddleware();
        // console.log(this.middlewareDataMap);
    }

    async loadRoutes() {
        for (const func of this.interceptors) {
            this.app.use(func);
        }

        const controllerList: Array<LoadControllerResult> = await loadController();
        const router = express.Router();
        // console.log(controllerList);
        for (const controller of controllerList) {

            const middlewareFuncList = [];
            for (const middlewareName of controller.middlewareNames) {
                const theMiddleware = this.middlewareDataMap.get(middlewareName);
                if (theMiddleware) middlewareFuncList.push(theMiddleware.func);
            }

            if (middlewareFuncList.length) {
                router[controller.method](controller.path, middlewareFuncList, controller.func);
            } else {
                router[controller.method](controller.path, controller.func);
            }
        }
        this.app.use(router);

        this.app.use((req, res, next) => {
            let isNotFound = !!res['isFindRoute'];
            let err = res['resError'];
            let resResult = res['resResult'];
            let cusResult = this.resultHandler(err, isNotFound, resResult);
            if (cusResult) {
                return res.send(cusResult);
            }

            if(err) return res.send(err);
            if(isNotFound) return res.send("404 Not Found");
            res.send(resResult);
        });

    }

    async start() {
        this.app = express();
        await this.loadBodyParser();
        await this.setStaticDir("/static", "/public");
        await this.loadMiddlewareDataMap();
        await this.loadRoutes();

        const port = 8080;
        this.app.listen(port, () => {
            console.log(`TsExpressApplication Started At: http://localhost:${port}...`);
        })
    }
}


