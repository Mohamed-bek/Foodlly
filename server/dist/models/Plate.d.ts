import { Model, Document } from "mongoose";
export interface IPlat extends Document {
    name: string;
    subName: string;
    description: string;
    chef: string;
    image: {
        public_id: string;
        url: string;
    };
    price: number;
    likes: number;
    dislikes: number;
    isMain: boolean;
    isBestSelles: boolean;
    type: string;
    rating: number;
}
declare const Plat: Model<IPlat>;
export default Plat;
