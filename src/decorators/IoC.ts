import "reflect-metadata";

export const IocContainer = {
    classMap: {},
    classInstanceMap: {},

    saveClass(className, classConstructor){

    },

    saveInstance(className, classConstructor){
        const ins = new classConstructor();

        // const pps2 = Object.getOwnPropertyNames(ins);
        // console.log(pps2)
        //
        // const ddd = Reflect.getPrototypeOf(ins);
        // const sss = Object.getOwnPropertyNames(ddd);
        // console.log(sss)

        IocContainer.classInstanceMap[className] = ins;
        return ins;
    },
    getInstance(className){
        return IocContainer.classInstanceMap[className];
    }
};


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
        console.log(ins);
        if(!ins) ins = IocContainer.saveInstance(typeClass.name, typeClass);

        descriptor.value = ins;
        Reflect.defineProperty(
            (target && target.prototype) || target,
            propertyKey,
            descriptor
        );

    }
}
