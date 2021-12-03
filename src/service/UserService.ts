import {BaseService} from "./BaseService";
import {Inject} from "../libs/decorators";

export class UserService {

    @Inject()
    baseService: BaseService;

    async list(){
        return  {name: 'jack', age: "66666"};
    }
    async errorTest(){
        throw {code: 23, msg: "dsadsad"};
    }

}

