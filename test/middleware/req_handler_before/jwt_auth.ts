import {
    Request,
    Response,
    NextFunction,
} from 'express';

import {RequestHandler} from "express-serve-static-core";

export const jwtAuth: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
    console.log(`jwtAuthMiddleware`);

    next();
};
