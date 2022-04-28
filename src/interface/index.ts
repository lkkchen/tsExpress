import {
    Request, Response, RequestHandler, NextFunction
} from "express-serve-static-core"
// import {RequestHandler} from "express";

export * from "./IController";

export type Constructor<T = any> = new (...args: any[]) => T;

export type TRequest = Request;
export type TResponse = Response;


export type TsResultHandlerFunc = (
    err: any,
    isNotFound: boolean,
    resResult: any,
) => any;

export interface TsExpressApplicationConfig  {
    interceptors: Array<RequestHandler> | [];
    resultHandler: TsResultHandlerFunc;
}

