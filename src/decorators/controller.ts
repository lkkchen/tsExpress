
import 'reflect-metadata';
import {saveControllerMetaData, saveControllerMethodMetaData} from "../service";
import {Constructor, ParamsTypeEnum} from "../interface";
import {getClassName} from "../libs"
import { IocContainer } from "./IoC"

export function createRequestMethodDecorator(method): Function {
    return function (path): PropertyDecorator {
        return function (target, propertyKey: string) {

            saveControllerMethodMetaData({
                className: getClassName(target),
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
            className: getClassName(target),
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
        let paramsTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
        saveControllerMethodMetaData({
            className: getClassName(target),
            methodName: propertyKey,
            routePath: null,
            reqMethod: null,
            middlewareName: null,
            methodParams: {
                type: ParamsTypeEnum.ReqQuery,
                fieldName: "",
                valueType: paramsTypes[parameterIndex],
                index: parameterIndex
            },
        })
    }
}

export function ReqBody(): ParameterDecorator {
    return function (target: Constructor, propertyKey: string, parameterIndex) {
        let paramsTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
        saveControllerMethodMetaData({
            className: getClassName(target),
            methodName: propertyKey,
            routePath: null,
            reqMethod: null,
            middlewareName: null,
            methodParams: {
                type: ParamsTypeEnum.ReqBody,
                fieldName: "",
                valueType: paramsTypes[parameterIndex],
                index: parameterIndex
            },
        })
    }
}

export function ReqPathVariable(): ParameterDecorator {
    return function (target: Constructor, propertyKey: string, parameterIndex) {
        let paramsTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
        saveControllerMethodMetaData({
            className: getClassName(target),
            methodName: propertyKey,
            routePath: null,
            reqMethod: null,
            middlewareName: null,
            methodParams: {
                type: ParamsTypeEnum.ReqPathVariable,
                fieldName: "",
                valueType: paramsTypes[parameterIndex],
                index: parameterIndex
            },
        })
    }
}

export function RequestCtx(): ParameterDecorator {
    return function (target: Constructor, propertyKey: string, parameterIndex) {
        let paramsTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
        saveControllerMethodMetaData({
            className: getClassName(target),
            methodName: propertyKey,
            routePath: null,
            reqMethod: null,
            middlewareName: null,
            methodParams: {
                type: ParamsTypeEnum.RequestCtx,
                fieldName: "",
                valueType: paramsTypes[parameterIndex],
                index: parameterIndex
            },
        })
    }
}


export function ResponseCtx(): ParameterDecorator {
    return function (target: Constructor, propertyKey: string, parameterIndex) {
        let paramsTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
        saveControllerMethodMetaData({
            className: getClassName(target),
            methodName: propertyKey,
            routePath: null,
            reqMethod: null,
            middlewareName: null,
            methodParams: {
                type: ParamsTypeEnum.ResponseCtx,
                fieldName: "",
                valueType: paramsTypes[parameterIndex],
                index: parameterIndex
            },
        })
    }
}
