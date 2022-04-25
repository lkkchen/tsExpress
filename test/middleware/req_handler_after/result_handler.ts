import {
    Request,
    Response,
    NextFunction,
} from 'express';
import {RequestHandler} from "express-serve-static-core";

export const resultHandlerMiddleware: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
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
};
