import {
    Request, Response, RequestHandler
} from "express-serve-static-core"
// import {RequestHandler} from "express";

export * from "./IController";

export type Constructor<T = any> = new (...args: any[]) => T;

export type TRequest = Request;
export type TResponse = Response;



export interface TsExpressApplicationConfig  {
    Interceptors: Array<RequestHandler>;
    errorHandler: RequestHandler;
    resultHandler: RequestHandler;
}

export type TsResultHandlerFunc = (
    err: any,
    isNotFound: boolean,
    req: Request,
    res: Response,
) => RequestHandler;
