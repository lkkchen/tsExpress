
export class UserService {

    async list(){
        return  {name: 'jack', age: "66666"};
    }
    async errorTest(){
        throw {code: 23, msg: "dsadsad"};
    }

}

