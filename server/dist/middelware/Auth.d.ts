import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    admin?: any;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};
