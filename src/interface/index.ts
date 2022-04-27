import {
    Request, Response,
} from "express-serve-static-core"

export * from "./IController";

export type Constructor<T = any> = new (...args: any[]) => T;

export type TRequest = Request;
export type TResponse = Response;
