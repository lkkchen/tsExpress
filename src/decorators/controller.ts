
import 'reflect-metadata';
import {saveControllerMetaData, saveControllerMethodMetaData} from "../service";
import {Constructor} from "../interface";

export function createRequestMethodDecorator(method): Function {
    return function (path): PropertyDecorator {
        return function (target: Constructor, propertyKey: string) {

            saveControllerMethodMetaData({
                className: target.name,
                methodName: propertyKey,
                routePath: path,
                reqMethod: method,
                middlewareName: null,
                methodParams: null,
            })
        }
    }
}

export function Controller(path): ClassDecorator {
    return function (target) {
        saveControllerMetaData({
            className: target.name,
            routePath: path,
            middlewareName: null
        })
    }
}

export const Get = createRequestMethodDecorator('get');
export const Post = createRequestMethodDecorator('post');
export const Put = createRequestMethodDecorator('put');
export const Delete = createRequestMethodDecorator('delete');


export function ReqQuery(): ParameterDecorator {
    return function (target: Constructor, propertyKey: string, parameterIndex) {
        saveControllerMethodMetaData({
            className: target.name,
            methodName: propertyKey,
            routePath: null,
            reqMethod: null,
            middlewareName: null,
            methodParams: null,
        })
    }
}

