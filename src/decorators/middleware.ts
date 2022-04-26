import 'reflect-metadata';

import {saveControllerMetaData, saveControllerMethodMetaData} from "../service";


export function Middleware(name) {
    return function (target, propertyKey?) {
        if(propertyKey){
            saveControllerMethodMetaData({
                className: target.name,
                methodName: propertyKey,
                routePath: null,
                reqMethod: null,
                middlewareName: name,
                methodParams: null,
            })
        }else{
            saveControllerMetaData({
                className: target.name,
                routePath: null,
                middlewareName: name
            })
        }
    }
}

