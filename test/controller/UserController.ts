import {UserService} from "../service/UserService";
import {Controller, Get, Inject, UseInterceptor, ReqBody, ReqQuery, RequestCtx, ResponseCtx} from "../../src";
import {TRequest, TResponse} from "../../src/interface";

import { ReqSubmitUserData } from "../Interface/request/UserRequest"
import { ResSubmitUserData } from "../Interface/response/UserResponse"


@Controller('/user')
export class UserController {
    @Inject()
    userService: UserService;

    // @UseInterceptor("roleAuth")
    // @Get("/list")
    // async list(
    //     @ReqQuery() page: number,
    //     @ReqQuery() pageSize: number,
    // ) {
    //     console.log(page, pageSize);
    //     return {asdasdsa: "353"}
    // }

    @Get("/submit")
    async submit(@ReqBody() userInfo: ReqSubmitUserData): Promise<ResSubmitUserData> {

        return null;
    }

    // @Get("/error")
    // async error(req, res) {
    //     return await this.userService.errorTest();
    // }

}

