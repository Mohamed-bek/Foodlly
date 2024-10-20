import { Request, Response } from "express";
export declare const makeOrder: (req: Request, res: Response) => Promise<void>;
export declare const getOrders: (req: Request, res: Response) => Promise<void>;
export declare const deleteOrder: (req: Request, res: Response) => Promise<void>;
export declare const confirmOrder: (req: Request, res: Response) => Promise<void>;
export declare const getOrder: (req: Request, res: Response) => Promise<void>;
