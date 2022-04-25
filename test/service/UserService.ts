import GoodsService from "./GoodsService";
import {Inject} from "../../src";

export class UserService {

    @Inject()
    goodService: GoodsService;

    async list(){
        const result = {name: 'jack', age: "66666", goods: null,};
        result.goods = await this.goodService.listGoods();
        return result;
    }
    async errorTest(){
        throw {code: 23, msg: "dsadsad"};
    }

}

