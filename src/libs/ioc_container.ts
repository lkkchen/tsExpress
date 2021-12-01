import "reflect-metadata";

const IocContainer = {
    classMap: {},
    classInstanceMap: {},

    saveClass(className, classConstructor){

    },

    saveInstance(className, classConstructor){
        const ins = new classConstructor();
        IocContainer.classInstanceMap[className] = ins;
        return ins;
    },
    getInstance(className){
        return IocContainer.classInstanceMap[className];
    }
};

export default IocContainer;
