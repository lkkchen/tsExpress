import "reflect-metadata";


export const IocContainer = {
    classMap: {},
    classInstanceMap: {},

    saveInstance(classTarget){
        let className = classTarget.name || classTarget.constructor.name;
        const ins = new classTarget();
        IocContainer.classInstanceMap[className] = ins;
        return ins;
    },
    getInstance(classTarget){
        let className = classTarget.name || classTarget.constructor.name;
        return IocContainer.classInstanceMap[className];
    }
};


export function Provide() {
    return function (target) {
        IocContainer.saveInstance(target);
    }
}

export function Inject (): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {

        const typeClass = Reflect.getMetadata('design:type', target, propertyKey);
        // console.log(typeClass);
        // console.log(typeClass.name);

        const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {writable: true, configurable: true};
        // 这里 不要每次都创建新的实例  创建过的存起来 下次直接取创建过的

        let ins = IocContainer.getInstance(typeClass);
        console.log(ins);
        if(!ins) ins = IocContainer.saveInstance(typeClass);

        descriptor.value = ins;
        Reflect.defineProperty(
            (target && target.prototype) || target,
            propertyKey,
            descriptor
        );

    }
}
