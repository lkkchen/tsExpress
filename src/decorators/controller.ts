
import 'reflect-metadata';

export const controllerPathKey = "controllerPath";
export const requestMethodKey = "requestMethod";
export const requestMethodPathKey = "requestMethodPath";


export function createRequestMethodDecorator(method): Function {
    return function (path): PropertyDecorator {
        return function (target, propertyKey) {
            Reflect.defineMetadata(requestMethodKey, method, target, propertyKey);
            Reflect.defineMetadata(requestMethodPathKey, path, target, propertyKey);
        }
    }
}

export function Controller(path): ClassDecorator {
    return function (target) {
        Reflect.defineMetadata(controllerPathKey, path, target);
    }
}

export const Get = createRequestMethodDecorator('get');
export const Post = createRequestMethodDecorator('post');
export const Put = createRequestMethodDecorator('put');
export const Delete = createRequestMethodDecorator('delete');
