import 'reflect-metadata';

import {saveControllerMetaData, saveControllerMethodMetaData} from "../service";
import {getClassName} from "../libs"

export function UseInterceptor(name) {
    return function (target, propertyKey?) {
        if(propertyKey){
            saveControllerMethodMetaData({
                className: getClassName(target),
                methodName: propertyKey,
                routePath: null,
                reqMethod: null,
                middlewareName: name,
                methodParams: null,
            })
        }else{
            saveControllerMetaData({
                className: getClassName(target),
                routePath: null,
                middlewareName: name
            })
        }
    }
}
