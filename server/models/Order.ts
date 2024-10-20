import mongoose, { Document, Schema, Model } from "mongoose";
import { IPlat } from "./Plate";

export interface IOrderItem extends Document {
  plat: IPlat;
  quantity: number;
}

export interface IOrder extends Document {
  order: IOrderItem[];
  name: string;
  phone: string;
  location: string;
  isConfirmed: boolean;
}

const orderItemSchema = new Schema<IOrderItem>({
  plat: { type: Schema.Types.ObjectId, ref: "Plat", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new Schema<IOrder>(
  {
    order: { type: [orderItemSchema], required: true },
    name: {
      type: String,
      required: [true, "The Name Of Client Is Required"],
    },
    phone: {
      type: String,
      required: [true, "The Phone Number Of Client Is Required"],
    },
    location: {
      type: String,
      required: [true, "The Location Of Client Is Required"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
