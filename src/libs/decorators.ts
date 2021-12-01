import 'reflect-metadata';

import IocContainer from "./ioc_container"

export function Provide(): ClassDecorator {
    return function (target) {
        IocContainer.saveClass(target.name, target);
    }
}

export function Inject (): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {

        const typeClass = Reflect.getMetadata('design:type', target, propertyKey);
        // console.log(typeClass);
        // console.log(typeClass.name);

        const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {writable: true, configurable: true};
        // 这里 不要每次都创建新的实例  创建过的存起来 下次直接取创建过的

        let ins = IocContainer.getInstance(typeClass.name);
        if(!ins) ins = IocContainer.saveInstance(typeClass.name, typeClass);
        descriptor.value = ins;
        Reflect.defineProperty(
            (target && target.prototype) || target,
            propertyKey,
            descriptor
        );

    }
}

export const controllerPathKey = "controllerPath";
export const requestMethodKey = "requestMethod";
export const requestMethodPathKey = "requestMethodPath";


export function Controller(path): ClassDecorator {
    return function (target) {
        Reflect.defineMetadata(controllerPathKey, path, target);
    }
}

export function createRequestMethodDecorator(method): Function {
    return function (path): PropertyDecorator {
        return function (target, propertyKey) {
            Reflect.defineMetadata(requestMethodKey, method, target, propertyKey);
            Reflect.defineMetadata(requestMethodPathKey, path, target, propertyKey);
        }
    }
}

export const Get = createRequestMethodDecorator('get');
export const Post = createRequestMethodDecorator('post');
export const Put = createRequestMethodDecorator('put');
export const Delete = createRequestMethodDecorator('delete');


export const pathParamKey = "pathParam";
export function PathParam(field): ParameterDecorator {
    return function (target, propertyKey) {
        Reflect.defineMetadata(target, pathParamKey, target, propertyKey);
    }
}

export const middlewareKey = "middleware";
export function Middleware(name) {
    return function (target, propertyKey?) {
        if(propertyKey){
            Reflect.defineMetadata(middlewareKey, name, target, propertyKey);
        }else{
            Reflect.defineMetadata(middlewareKey, name, target);
        }
    }
}
