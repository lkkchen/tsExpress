import "reflect-metadata"
import {loadFiles, LoadFileResult} from "./file_loader";
import {RequestHandler} from "express-serve-static-core";
import { controllerMetaDataMap } from "../service"
import {getParameterName} from "../libs";
import {ParamsTypeEnum} from "../interface";

export interface LoadControllerResult {
    path: string,
    method: string | 'get' | 'post' | 'put' | 'delete',
    func: RequestHandler,
    middlewareNames: Array<string>,
}

export async function loadController(): Promise<Array<LoadControllerResult>> {
    const controllerList: Array<LoadFileResult>  = loadFiles("./controller");

    let loadControllerResult: Array<LoadControllerResult> = [];
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
        // console.log(controllerMetaData)

        for(const methodName of methodNames){
            // 跳过属性为对象的
            if(Object.prototype.toString.call(instance[methodName]) === '[object Object]'){
                continue;
            }

            // 获取返回值
            const methodReturnType = Reflect.getMetadata("design:returntype", theClass, methodName)
            console.log(methodReturnType)

            const methodMetaData = controllerMetaData.methodMetaDataMap.get(methodName);
            let paramsNames = getParameterName(prototype[methodName])
            console.log(paramsNames)

            paramsNames.forEach((name, idx) => {
                // 这里要判断下  有可能用户方法的参数上没写注解
                if(methodMetaData.params[idx]){
                    methodMetaData.params[idx].fieldName = name;
                }
            });
            console.log(methodMetaData);

            const handlerFunc: RequestHandler = (req, res, next) => {
                res['isFindRoute'] = true;

                let finalParams = [];
                methodMetaData.params.forEach((param) => {
                    if(param.type === ParamsTypeEnum.ReqQuery){
                        finalParams.push(req.query[param.fieldName])
                    }
                    if(param.type === ParamsTypeEnum.ReqBody){
                        finalParams.push(req.body)
                    }
                    if(param.type === ParamsTypeEnum.ReqPathVariable){
                        finalParams.push(req.params[param.fieldName])
                    }
                    if(param.type === ParamsTypeEnum.RequestCtx){
                        finalParams.push(req)
                    }
                    if(param.type === ParamsTypeEnum.ResponseCtx){
                        finalParams.push(res)
                    }
                });

                let reqHandler = prototype[methodName].bind(instance);
                if(Object.prototype.toString.call(reqHandler) === '[object AsyncFunction]'){
                    reqHandler(...finalParams).then((result) => {
                        res['resResult'] = result;
                        next();
                    }).catch((err) => {
                        console.error("----------ERROR-----------");
                        console.error(err);
                        console.error(err.toString());
                        if(err.stack) console.error(err.stack);
                        console.error("----------ERROR-----------");
                        res['resError'] = err;
                        next();
                    });
                    return;
                }
                reqHandler(...finalParams);
                next();
            };

            // controller的中间件在前 method的在后
            let finalMiddles = controllerMetaData.middlewareNames.concat(methodMetaData.middlewareNames);
            // 去除重复的中间件
            finalMiddles = finalMiddles.filter((name, idx) => (finalMiddles.indexOf(name) === idx));

            loadControllerResult.push({
                path: `${controllerMetaData.routePath}${methodMetaData.routePath}`,
                method: methodMetaData.reqMethod,
                func: handlerFunc,
                middlewareNames: finalMiddles,
            });
        }
    }
    return loadControllerResult;
}
