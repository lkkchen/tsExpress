
import {TsResultHandlerFunc} from "../../src/interface";

export const resultHandler: TsResultHandlerFunc = function (err, isNotFound, resResult) {

    const result = {code: 0};
    if(err){
        result.code = 500;
        result['msg'] = "Server Error";
        if(err.code)  result.code = err.code;
        if(err.msg)  result['msg'] = err.msg;
        return result;
    }
    if(isNotFound){
        return {code: 404, msg: "api not found"};
    }

    result['data'] = resResult;
    return result;

};
