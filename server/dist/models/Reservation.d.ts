import { Document, Model } from "mongoose";
interface IReservation extends Document {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    isConfirmed: boolean;
}
declare const Reservation: Model<IReservation>;
export default Reservation;
