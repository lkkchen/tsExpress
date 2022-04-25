import {
    Request,
    Response,
} from 'express';
import {RequestHandler} from "express-serve-static-core";

export const notFoundHandler: RequestHandler = function (req: Request, res: Response) {
    res.send('404 - Not Found');
};

export const sad: string = "dsadsad";




