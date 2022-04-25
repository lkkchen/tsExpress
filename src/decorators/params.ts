
import 'reflect-metadata';
import {requestMethodKey, requestMethodPathKey} from "./controller";

export const reqPathParamsKey = "reqPathParams";
export const reqQueryKey = "reqQuery";
export const reqBodyKey = "reqBody";


export function createRequestParamsDecorator(method): Function {
    return function (path): PropertyDecorator {
        return function (target, propertyKey) {
            Reflect.defineMetadata(requestMethodKey, method, target, propertyKey);
            Reflect.defineMetadata(requestMethodPathKey, path, target, propertyKey);
        }
    }
}


export function ReqQuery(): ParameterDecorator {
    return function (target, propertyKey, parameterIndex) {
        Reflect.defineMetadata(reqQueryKey, null, target, propertyKey);
    }
}


export function ReqBody(): ParameterDecorator {
    return function (target, propertyKey, parameterIndex) {
        Reflect.defineMetadata(reqBodyKey, null, target, propertyKey);
    }
}


export function ReqPathParams(name: string): ParameterDecorator {
    return function (target, propertyKey, parameterIndex) {
        Reflect.defineMetadata(reqPathParamsKey, name, target, propertyKey);
    }
}



