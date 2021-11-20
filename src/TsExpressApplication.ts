import 'reflect-metadata'
import * as express from 'express'
import * as moment from 'moment'
import {
    Application,
    Request,
    Response,
    NextFunction,
} from 'express';

import * as bodyParser from 'body-parser'
import {loadController, LoadControllerResult} from "./loaders/controller_loader";


class TsExpressApplication {
    app: Application;
    config: object;

    constructor(config: object) {
        this.config = config;
    }

    async loadBodyParser(){
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json({limit: "10mb"}));
    }

    // 这个其实也是中间件 可以让用户自定义
    async loadOriginCrossSetting(){
        this.app.use(function (req: Request, res: Response, next: NextFunction) {
           const originalPath = req.originalUrl.split("?")[0];

            console.log(`\r\n`);
            console.log(`[${moment()} ${req.method.toUpperCase()} ${originalPath}]`);
            console.log(`[headers]:${JSON.stringify(req.headers)}`);
            console.log(`[query]:${JSON.stringify(req.query)}`);
            console.log(`[body]:${JSON.stringify(req.body)} \n`);

            // 支持跨域
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With,x-jwt-token");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            if(req.method === 'OPTIONS') {
                return res.sendStatus(204);
            }
            next();
        });
    }

    async loadMiddleware(middlewareFuncList: Array<any>){
        for(const middleware of middlewareFuncList){
            this.app.use(middleware);
        }
    }

    async loadResultHandler(){
        this.app.use((req, res, next) => {
            const result = {code: 0};
            if(!res['isFindRoute']){
                return next();
            }

            if(res['resResult']) result['data'] = res['resResult'];
            if(res['resError']) {
                result.code = 500;
                result['msg'] = "Server Error";
                if(res['resError'].code) result.code = res['resError'].code;
                if(res['resError'].msg) result['msg'] = res['resError'].msg;
            }

            res.send(result);
        });
    }

    async notFoundHandler(){
        this.app.use((req, res) => {
            res.send('404 - Not Found');
        });
    }

    async loadRoutes(){
        const controllerList: Array<LoadControllerResult> = await loadController();
        const router = express.Router();
        console.log(controllerList);
        for(const controller of controllerList){
            router[controller.method](controller.path, controller.func);
        }
        this.app.use(router);
    }

    async start(){
        this.app = express();
        await this.loadBodyParser();
        await this.loadOriginCrossSetting();
        await this.loadMiddleware([]);
        await this.loadRoutes();
        await this.loadResultHandler();
        await this.notFoundHandler();


        this.app.listen(8080,() => {
            console.log('TsExpressApplication Started...');
        })
    }
}


export default TsExpressApplication;


