

export enum ParamsTypeEnum {
    ReqBody = 'ReqBody',
    ReqQuery = 'ReqQuery',
    ReqPathVariable = 'ReqPathVariable',
    RequestCtx = 'RequestCtx',
    ResponseCtx = 'ResponseCtx',
}


export interface ControllerMethodParams {
    type: ParamsTypeEnum,
    fieldName: string,
    valueType: any,
    index: number,
}

export interface ControllerMethodMetaData {
    methodName: string,
    routePath: string | '/',
    reqMethod: string,
    middlewareNames: Array<string>,
    params: Array<ControllerMethodParams>,
    methodReturnType: any,
}

export interface ControllerClassMetaData {
    className: string,
    routePath: string | '/',
    middlewareNames: Array<string>,
    methodMetaDataMap: Map<string, ControllerMethodMetaData>,
}

export type ControllerMetaDataMap = Map<string, ControllerClassMetaData>;



export interface ISaveControllerMetaData {
    className: string,
    routePath: string,
    middlewareName: string,
}

export interface ISaveControllerMethodMetaData {
    className: string,
    methodName: string,
    routePath: string,
    reqMethod: string,
    middlewareName: string,
    methodParams: ControllerMethodParams,
    methodReturnType?: any,
}

