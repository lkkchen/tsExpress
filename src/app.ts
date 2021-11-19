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
import {loadController, LoadControllerResult} from "./loader/controller_loader";


class TsExpressApplication {
    app: Application;
    ctx: object;
    config: object;

    constructor(config) {
        this.config = config;
    }

    loadBodyParser(){
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json({limit: "10mb"}));
    }

    // 这个其实也是中间件 可以让用户自定义
    loadOriginCrossSetting(){
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

    loadMiddleware(middlewareFuncList){
        for(const middleware of middlewareFuncList){
            this.app.use(middleware);
        }
    }

    async loadRoutes(){
        const controllerList: Array<LoadControllerResult> = await loadController();
        const router = express.Router();

        for(const controller of controllerList){
            if(controller.middleware){
                router.use(controller.path, controller.middleware, controller.func);
            }

        }

    }

}
