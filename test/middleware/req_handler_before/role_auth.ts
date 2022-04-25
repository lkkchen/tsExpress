import {
    Request,
    Response,
    NextFunction,
} from 'express';

import {RequestHandler} from "express-serve-static-core";

export const roleAuthMiddleware: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
    console.log(`roleAuthMiddleware`);

    next();
};
