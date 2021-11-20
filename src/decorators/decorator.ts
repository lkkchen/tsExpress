import 'reflect-metadata';

export function Inject (): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const typeClass = Reflect.getMetadata('design:type', target, propertyKey);

        const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {writable: true, configurable: true};
        descriptor.value = new typeClass();
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
    return function (target: any) {
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

export function PathParam(paramKey): ParameterDecorator {
    return function (target, propertyKey) {

    }
}

