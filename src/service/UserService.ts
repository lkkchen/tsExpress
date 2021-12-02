import {BaseService} from "./BaseService";

export class UserService {

    name:string = "dsadasdas";

    async list(){
        return  {name: 'jack', age: "66666"};
    }
    async errorTest(){
        throw {code: 23, msg: "dsadsad"};
    }

}

