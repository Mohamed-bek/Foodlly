import { Router } from "express";
import {
  ConfirmReservation,
  GetListOfReservation,
  MakeReservation,
  DeleteReservation,
} from "../controllers/ReservationController";
import { authMiddleware } from "../middelware/Auth";

const ReservationRouter = Router();

ReservationRouter.post("/reservation", MakeReservation);
ReservationRouter.get("/reservations", authMiddleware, GetListOfReservation);
ReservationRouter.put("/reservation/:id", authMiddleware, ConfirmReservation);
ReservationRouter.delete("/reservation/:id", authMiddleware, DeleteReservation);

export default ReservationRouter;
