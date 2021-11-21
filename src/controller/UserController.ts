

import {UserService} from "../service/UserService";
import {Controller, Get, Inject, Middleware} from "../libs/decorators";


@Middleware("jwtAuth")
@Controller('/user')
export class UserController {
    @Inject()
    userService: UserService;

    @Middleware("roleAuth")
    @Get("/list")
    async list(req, res){
        return await this.userService.list();
    }

    @Get("/error")
    async error(req, res){
        return await this.userService.errorTest();
    }

}

