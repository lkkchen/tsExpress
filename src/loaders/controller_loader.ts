import {loadFiles, LoadFileResult} from "./file_loader";
import {RequestHandler} from "express-serve-static-core";
import { controllerMetaDataMap } from "../service"
import {getParameterName} from "../libs";
import { IocContainer } from "../decorators"

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
        const theClassName = theClass.name || theClass.constructor.name;
        const instance = new theClass();
        const prototype = Reflect.getPrototypeOf(instance);
        // 方法在原型上
        const methodNames = Object.getOwnPropertyNames(prototype).filter(item => item !== 'constructor');

        const controllerMetaData = controllerMetaDataMap.get(theClassName);
        for(const methodName of methodNames){
            const methodMetaData = controllerMetaData.methodMetaDataMap.get(methodName);
            let paramsNames = getParameterName(prototype[methodName])
            console.log(paramsNames)

            paramsNames.forEach((name, idx) => {
                methodMetaData.params[idx].fieldName = name;
            });
            console.log(methodMetaData)

        }

        // for(const methodName of methodNames){
        //     const type = Object.prototype.toString.call(instance[methodName]);
        //     if(type === '[object Object]'){
        //         continue;
        //     }
        //
        //
        //     const reqMethod = Reflect.getMetadata(requestMethodKey, instance, methodName);
        //     const reqPath = Reflect.getMetadata(requestMethodPathKey, instance, methodName);
        //     const methodMiddlewareName = Reflect.getMetadata(middlewareKey, instance, methodName);
        //
        //
        //     const handlerFunc: RequestHandler = (req, res, next) => {
        //         res['isFindRoute'] = true;
        //         let handler = prototype[methodName].bind(instance);
        //
        //         // 这里调用时传入得参数应该根据 用户注解上写的来
        //         // 获取该方法上的元数据
        //
        //         if(Object.prototype.toString.call(handler) === '[object AsyncFunction]'){
        //             handler = function (req, res, next) {
        //                 prototype[methodName].bind(instance)(req, res).then((result) => {
        //                     res['resResult'] = result;
        //                     next();
        //                 }).catch((err) => {
        //                     console.error("----------ERROR-----------");
        //                     console.error(err);
        //                     console.error(err.toString());
        //                     if(err.stack) console.error(err.stack);
        //                     console.error("----------ERROR-----------");
        //                     res['resError'] = err;
        //                     next();
        //                 })
        //             };
        //             return handler(req, res, next);
        //         }
        //         res['resResult'] = handler(req, res, next);
        //         next();
        //     };
        //
        //     // controller的中间件在前 路由的在后
        //     const middlewareNames = [];
        //     if(controllerMiddlewareName) middlewareNames.push(controllerMiddlewareName);
        //     if(methodMiddlewareName && middlewareNames.indexOf(methodMiddlewareName) === -1) middlewareNames.push(methodMiddlewareName);
        //
        //     result.push({
        //         path: `${basePath}${reqPath}`,
        //         method: reqMethod,
        //         func: handlerFunc,
        //         middlewareNames: middlewareNames,
        //     });
        // }

    }
    return result;
}
