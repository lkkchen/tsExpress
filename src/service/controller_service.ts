import "reflect-metadata"

import {
    ControllerClassMetaData,
    ControllerMetaDataMap,
    ControllerMethodMetaData,
    ControllerMethodParams,
    ISaveControllerMetaData,
    ISaveControllerMethodMetaData,
} from "../interface"

export const controllerMetaDataMap: ControllerMetaDataMap = new Map<string, ControllerClassMetaData>();

export function getControllerMetaData(className: string) {
    let controllerMeta = controllerMetaDataMap.get(className);
    if (!controllerMeta) {
        controllerMeta = {
            className,
            routePath: "/",
            middlewareNames: new Array<string>(),
            methodMetaDataMap: new Map<string, ControllerMethodMetaData>(),
        };
        controllerMetaDataMap.set(className, controllerMeta)
    }
    return controllerMeta;
}


export function getControllerMethodMetaData(className: string, methodName: string) {
    let controllerMeta = getControllerMetaData(className);
    let methodMetaData = controllerMeta.methodMetaDataMap.get(methodName);
    if (!methodMetaData) {
        methodMetaData = {
            methodName,
            routePath: "/",
            reqMethod: "",
            middlewareNames: new Array<string>(),
            params: new Array<ControllerMethodParams>()
        };
        controllerMeta.methodMetaDataMap.set(methodName, methodMetaData);
    }
    return methodMetaData;
}


export function saveControllerMetaData(data: ISaveControllerMetaData) {
    let controllerMeta = getControllerMetaData(data.className);
    if(data.routePath) controllerMeta.routePath = data.routePath;
    if(data.middlewareName) controllerMeta.middlewareNames.push(data.middlewareName)
}


export function saveControllerMethodMetaData(data: ISaveControllerMethodMetaData) {
    let methodMetaData = getControllerMethodMetaData(data.className, data.methodName);
    if(data.routePath) methodMetaData.routePath = data.routePath;
    if(data.reqMethod) methodMetaData.reqMethod = data.reqMethod;
    if(data.middlewareName) methodMetaData.middlewareNames.push(data.middlewareName);

    if(data.methodParams){
        methodMetaData.params[data.methodParams.index] = data.methodParams;
    }
}
