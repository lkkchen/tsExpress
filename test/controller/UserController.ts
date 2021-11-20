

import {UserService} from "../service/UserService";
import {Controller, Get, Inject} from "../../src/decorators/decorator";


@Controller('/user')
export class UserController {
    @Inject()
    userService: UserService;


    @Get("/list")
    async list(req, res){
        return await this.userService.list();
    }

    @Get("/error")
    async error(req, res){
        return await this.userService.errorTest();
    }

}

