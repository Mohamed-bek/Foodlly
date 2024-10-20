import { Request, Response } from "express";
export declare const MakeReservation: (req: Request, res: Response) => Promise<void>;
export declare const GetListOfReservation: (req: Request, res: Response) => Promise<void>;
export declare const ConfirmReservation: (req: Request, res: Response) => Promise<void>;
export declare const DeleteReservation: (req: Request, res: Response) => Promise<void>;
