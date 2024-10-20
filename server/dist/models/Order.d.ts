import { Document, Model } from "mongoose";
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
declare const Order: Model<IOrder>;
export default Order;
