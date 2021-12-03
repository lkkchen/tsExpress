
import * as mongoose from "mongoose"

const mongodbConnect = function (callback: Function) {
    const config = global.config;
    const {log} = global.log;
    if(!config){
        log("Server config not exists");
    }
    if(!config.mongodb){
        global.log("mongodb config not exists");
    }

    //数据库连接
    let mongoCfg = config.mongodb;
    let options = {
        keepAlive: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };

    let connectStr = 'mongodb://' + mongoCfg.user + ':' + mongoCfg.pwd + '@' + mongoCfg.host + ':' + mongoCfg.port + '/' + mongoCfg.db;
    log(connectStr);
    mongoose.connect(connectStr, options).catch((err) => {
        log(err.stack)
    }).finally(() => {
        log("MongoDB Connect Success...");

        callback();
    });
};


export default mongodbConnect;
