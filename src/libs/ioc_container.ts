import "reflect-metadata";

const IocContainer = {
    classMap: {},
    classInstanceMap: {},

    saveClass(className, classConstructor){
        
    },

    saveInstance(className, classConstructor){
        const ins = new classConstructor();

        const pps2 = Object.getOwnPropertyNames(ins);
        console.log(pps2)

        const ddd = Reflect.getPrototypeOf(ins);
        const sss = Object.getOwnPropertyNames(ddd);
        console.log(sss)

        IocContainer.classInstanceMap[className] = ins;
        return ins;
    },
    getInstance(className){
        return IocContainer.classInstanceMap[className];
    }
};

export default IocContainer;
