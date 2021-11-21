
import {LoadFileResult, loadFiles} from "./file_loader";
import {RequestHandler} from "express-serve-static-core";

export interface LoadMiddlewareResult {
    name: string,
    func: RequestHandler
}

export type MiddlewareMap = Map<string, LoadMiddlewareResult>;

export async function loadMiddleware(): Promise<MiddlewareMap>{
    const fileList: Array<LoadFileResult>  = loadFiles("./middleware");

    const result: MiddlewareMap = new Map<string, LoadMiddlewareResult>();

    for(const theFile of fileList){
        const expObj = await import(theFile.filePath);
        const mKeys = Object.keys(expObj);
        for(let kk of mKeys){

            // console.log(theFile.name);
            // console.log(kk);
            // console.log(expObj[kk]);
            const name = kk.split("Middleware").join("");

            if(Object.prototype.toString.call(expObj[kk]) === '[object Function]'){
                const mResult: LoadMiddlewareResult = {
                    name: name,
                    func: expObj[kk]
                };
                result.set(name, mResult);
            }
        }

    }

    return result;
}
