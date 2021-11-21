import {loadFiles, LoadFileResult} from "./file_loader";
import {controllerPathKey, middlewareKey, requestMethodKey, requestMethodPathKey} from "../libs/decorators";
import {RequestHandler} from "express-serve-static-core";


export interface LoadControllerResult {
    path: string,
    method: string | 'get' | 'post' | 'put' | 'delete',
    func: RequestHandler,
    middlewareNames: Array<string>,
}

export async function loadController(): Promise<Array<LoadControllerResult>> {
    const controllerList: Array<LoadFileResult>  = loadFiles("./controller");

    let result: Array<LoadControllerResult> = [];
    for(const controller of controllerList){
        const cls = await import(controller.filePath);
        const clsKey = Object.keys(cls)[0];
        if(!clsKey) continue;

        const theClass = cls[clsKey];
        const basePath = Reflect.getMetadata(controllerPathKey, theClass);
        const controllerMiddlewareName = Reflect.getMetadata(middlewareKey, theClass);

        const instance = new theClass();
        const prototype = Reflect.getPrototypeOf(instance);
        const methodNames = Object.getOwnPropertyNames(prototype).filter(item => item !== 'constructor');

        for(const methodName of methodNames){
            const type = Object.prototype.toString.call(instance[methodName]);
            if(type === '[object Object]'){
                continue;
            }

            const reqMethod = Reflect.getMetadata(requestMethodKey, instance, methodName);
            const reqPath = Reflect.getMetadata(requestMethodPathKey, instance, methodName);
            const methodMiddlewareName = Reflect.getMetadata(middlewareKey, instance, methodName);

            const handlerFunc: RequestHandler = (req, res, next) => {
                res['isFindRoute'] = true;
                let handler = prototype[methodName].bind(instance);
                if(Object.prototype.toString.call(handler) === '[object AsyncFunction]'){
                    handler = function (req, res, next) {
                        prototype[methodName].bind(instance)(req, res).then((result) => {
                            res['resResult'] = result;
                            next();
                        }).catch((err) => {
                            res['resError'] = err;
                            next();
                        })
                    };
                    return handler(req, res, next);
                }
                res['resResult'] = handler(req, res, next);
                next();
            };

            const middlewareNames = [];
            if(controllerMiddlewareName) middlewareNames.push(controllerMiddlewareName);
            if(methodMiddlewareName && middlewareNames.indexOf(methodMiddlewareName) === -1) middlewareNames.push(methodMiddlewareName);

            result.push({
                path: `${basePath}${reqPath}`,
                method: reqMethod,
                func: handlerFunc,
                middlewareNames: middlewareNames,
            });
        }

    }
    return result;
}
