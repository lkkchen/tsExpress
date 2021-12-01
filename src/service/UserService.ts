import {BaseService} from "./BaseService";

export class UserService {

    name:string = "33333333";

    async list(){
        return  {name: 'jack', age: "66666"};
    }
    async errorTest(){
        throw {code: 23, msg: "dsadsad"};
    }

}

