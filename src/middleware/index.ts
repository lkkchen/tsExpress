// import {crossOriginMiddleware} from './req_handler_before/cross_origin'
// import {jwtAuthMiddleware} from './req_handler_before/jwt_auth'
//
// import {notFoundHandler} from './req_handler_after/not_found_handler'
// import {resultHandlerMiddleware} from './req_handler_after/result_handler'
//
// import {RequestHandler} from "express-serve-static-core";
//
// interface MiddlewareSettingInterface {
//     req_handler_before: Array<RequestHandler>,
//     req_handler_after: Array<RequestHandler>,
// }
//
//
// /**
//  * 设置中间件的顺序： 数组中元素的顺序就是中间件执行的顺序
//  * */
// const middlewareSetting: MiddlewareSettingInterface = {
//     // 在处理请求之前
//     req_handler_before: [
//         crossOriginMiddleware,
//         jwtAuthMiddleware,
//     ],
//     // 在处理请求之后
//     req_handler_after: [
//         resultHandlerMiddleware,
//         notFoundHandler,
//     ]
// };
//
// export default middlewareSetting;
//
