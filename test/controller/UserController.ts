// import {UserService} from "../service/UserService";
// import {Controller, Get, Inject, Middleware, ReqQuery} from "../../src";
//
//
// @Middleware("jwtAuth")
// @Controller('/user')
// export class UserController {
//     @Inject()
//     userService: UserService;
//
//     @Middleware("roleAuth")
//     @Get("/list")
//     async list(
//         @ReqQuery() page: number,
//         @ReqQuery() pageSize: number
//     ) {
//         return await this.userService.list();
//     }
//     //
//     // @Get("/error")
//     // async error(req, res) {
//     //     return await this.userService.errorTest();
//     // }
//
// }
//
