import mongoose, { Document, Schema, Model } from "mongoose";

interface IReservation extends Document {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  isConfirmed: boolean;
}

const ReservationSchema = new Schema<IReservation>(
  {
    name: {
      type: String,
      required: [true, " The Name of the Booker is required"],
    },
    email: {
      type: String,
      required: [true, " The Email of the Booker is required"],
    },
    phone: {
      type: String,
      required: [true, " The Phone Number of the Booker is required"],
    },
    guests: {
      type: Number,
      required: [true, " The Number of the guests is required"],
    },
    date: {
      type: String,
      required: [true, " The Date of the reservation is required"],
    },
    time: {
      type: String,
      required: [true, " The Time of the reservation is required"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Reservation: Model<IReservation> = mongoose.model(
  "Reservation",
  ReservationSchema
);
export default Reservation;
