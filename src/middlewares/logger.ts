import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Logger: ", req.method, req.path, Date().toLocaleString());
    next();
}