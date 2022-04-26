
import 'reflect-metadata';
import {requestMethodKey, requestMethodPathKey} from "./controller";

export const reqPathParamsKey = "reqPathParams";
export const reqQueryKey = "reqQuery";
export const reqBodyKey = "reqBody";

export interface MethodParams {
    type: string,
    fieldName: string,
    valueType: any,
}

// key: className_methodName
export type MethodParamsMap = Map<string, Array<MethodParams>>

function saveClassMethodParams() {

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



