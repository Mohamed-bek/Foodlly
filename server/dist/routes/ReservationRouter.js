"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReservationController_1 = require("../controllers/ReservationController");
const Auth_1 = require("../middelware/Auth");
const ReservationRouter = (0, express_1.Router)();
ReservationRouter.post("/reservation", ReservationController_1.MakeReservation);
ReservationRouter.get("/reservations", Auth_1.authMiddleware, ReservationController_1.GetListOfReservation);
ReservationRouter.put("/reservation/:id", Auth_1.authMiddleware, ReservationController_1.ConfirmReservation);
ReservationRouter.delete("/reservation/:id", Auth_1.authMiddleware, ReservationController_1.DeleteReservation);
exports.default = ReservationRouter;
//# sourceMappingURL=ReservationRouter.js.map