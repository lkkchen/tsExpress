import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as moment from "moment";
import {RequestHandler} from "express-serve-static-core";

export const crossOrigin: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
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
};
