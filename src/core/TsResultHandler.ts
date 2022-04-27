import {
    Request,
    Response,
    NextFunction,
} from 'express';
import {RequestHandler} from "express-serve-static-core";
import {TsResultHandlerFunc} from "../interface";

// export const TsResultHandler: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
//     const result = {code: 0};
//     if(!res['isFindRoute']){
//         return next();
//     }
//
//     if(res['resResult']) result['data'] = res['resResult'];
//     if(res['resError']) {
//         result.code = 500;
//         result['msg'] = "Server Error";
//         if(res['resError'].code) result.code = res['resError'].code;
//         if(res['resError'].msg) result['msg'] = res['resError'].msg;
//     }
//
//     res.send(result);
// };


export const TsResultHandler = function (cusHandler: TsResultHandlerFunc) {
    return function (req: Request, res: Response, next: NextFunction) {
        const result = {code: 0};
        if(!res['isFindRoute']){
            return next();
        }
    }
};
