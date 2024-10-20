"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteReservation = exports.ConfirmReservation = exports.GetListOfReservation = exports.MakeReservation = void 0;
const Reservation_1 = __importDefault(require("../models/Reservation"));
const MakeReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, date, time, email, phone, guests } = req.body;
        console.log(name, date, time, email, phone, guests);
        const reservation = yield Reservation_1.default.create({
            name,
            date,
            time,
            email,
            phone,
            guests,
        });
        if (!reservation) {
            throw Error("Reservation not created");
        }
        res.status(200).json({ reservation });
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
});
exports.MakeReservation = MakeReservation;
const GetListOfReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isConfirmed } = req.query;
        const filter = {};
        if (isConfirmed !== undefined)
            filter.isConfirmed = isConfirmed;
        const reservations = yield Reservation_1.default.find(filter);
        if (!reservations) {
            throw Error("Reservation not created");
        }
        res.status(200).json({ reservations });
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
});
exports.GetListOfReservation = GetListOfReservation;
const ConfirmReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reservation = yield Reservation_1.default.findById(id);
        if (!reservation) {
            throw Error("Reservation not created");
        }
        reservation.isConfirmed = true;
        yield reservation.save();
        res.status(200).json({ reservation });
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
});
exports.ConfirmReservation = ConfirmReservation;
const DeleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reservation = yield Reservation_1.default.findById(id);
        if (!reservation) {
            throw Error("Reservation not created");
        }
        yield reservation.deleteOne();
        res.status(200).json({ message: " Resrvation Canceld Succesfuly" });
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
});
exports.DeleteReservation = DeleteReservation;
