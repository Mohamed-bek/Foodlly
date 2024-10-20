import mongoose, { Model, Schema, Document } from "mongoose";

export interface IPlat extends Document {
  name: string;
  subName: string;
  description: string;
  chef: string;
  image: { public_id: string; url: string };
  price: number;
  likes: number;
  dislikes: number;
  isMain: boolean;
  isBestSelles: boolean;
  type: string;
  rating: number;
}

const platSchema = new Schema<IPlat>(
  {
    name: {
      type: String,
      required: [true, " The Name of the plat is required"],
    },
    subName: {
      type: String,
      required: [true, " The SubName of the plat is required"],
    },
    chef: {
      type: String,
    },
    isMain: {
      type: Boolean,
      default: false,
    },
    isBestSelles: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: [true, " The Plat Type is required"],
    },
    description: String,
    image: {
      public_id: String,
      url: String,
    },
    price: {
      type: Number,
      required: [true, " The Price of the plat is required"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);
platSchema.index({ isMain: 1 });
const Plat: Model<IPlat> = mongoose.model("Plat", platSchema);
export default Plat;
