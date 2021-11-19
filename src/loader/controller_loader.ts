import {loadFiles, LoadFileResult} from "./file_loader";
import {controllerPathKey, requestMethodKey, requestMethodPathKey} from "../decorator/decorator";
import {RequestHandler} from "express-serve-static-core";


export interface LoadControllerResult {
    path: string,
    method: string | 'get' | 'post' | 'put' | 'delete',
    middleware?: RequestHandler,
    func: RequestHandler,
    funcName: string
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

            const handlerFunc: RequestHandler = (req, res, next) => {

            };

            result.push({
                path: `${basePath}${reqPath}`,
                method: reqMethod,
                middleware: null,
                func: prototype[methodName].bind(instance),
                funcName: methodName
            });
        }

    }
    return result;
}
