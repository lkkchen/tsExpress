import {UserService} from "../service/UserService";
import {Controller, Get, Inject, UseInterceptor, ReqBody, ReqQuery, RequestCtx, ResponseCtx} from "../../src";
import {TRequest, TResponse} from "../../src/interface";


class ReqUserInfoData {
    name: string;
    age: number;
}

@UseInterceptor("jwtAuth")
@Controller('/user')
export class UserController {
    @Inject()
    userService: UserService;

    @UseInterceptor("roleAuth")
    @Get("/list")
    async list(
        @RequestCtx() req,
        @ResponseCtx() res,
        @ReqQuery() page: number,
        @ReqQuery() pageSize: number,
    ) {
        console.log(page, pageSize);
    }
    //
    // @Get("/error")
    // async error(req, res) {
    //     return await this.userService.errorTest();
    // }

}

