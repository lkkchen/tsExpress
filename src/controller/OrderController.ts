

import {UserService} from "../service/UserService";
import {Controller, Get, Inject, Middleware} from "../libs/decorators";


@Middleware("jwtAuth")
@Controller('/order')
export class OrderController {
    @Inject()
    userService: UserService;

    @Get("/orderShip")
    async orderShip(req, res){
        return [];
    }


}

