import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import Reservation from "../models/Reservation";

export const MakeReservation = async (req: Request, res: Response) => {
  try {
    const { name, date, time, email, phone, guests } = req.body;
    console.log(name, date, time, email, phone, guests);
    const reservation = await Reservation.create({
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
  } catch (error: any) {
    res.status(400).json({ err: error.message });
  }
};

export const GetListOfReservation = async (req: Request, res: Response) => {
  try {
    const { isConfirmed } = req.query;
    const filter: FilterQuery<typeof Reservation> = {};
    if (isConfirmed !== undefined) filter.isConfirmed = isConfirmed;
    const reservations = await Reservation.find(filter);
    if (!reservations) {
      throw Error("Reservation not created");
    }
    res.status(200).json({ reservations });
  } catch (error: any) {
    res.status(400).json({ err: error.message });
  }
};

export const ConfirmReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      throw Error("Reservation not created");
    }
    reservation.isConfirmed = true;
    await reservation.save();
    res.status(200).json({ reservation });
  } catch (error: any) {
    res.status(400).json({ err: error.message });
  }
};

export const DeleteReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      throw Error("Reservation not created");
    }
    await reservation.deleteOne();
    res.status(200).json({ message: " Resrvation Canceld Succesfuly" });
  } catch (error: any) {
    res.status(400).json({ err: error.message });
  }
};
