import 'reflect-metadata';

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

