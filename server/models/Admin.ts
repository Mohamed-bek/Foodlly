import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IAdmin extends Document {
  username: string;
  password: string;
  email: string;
  comparePassword(inputPassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

const AdminSchema: Schema<IAdmin> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

AdminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err: any) {
    next(err);
  }
});

AdminSchema.methods.comparePassword = function (
  inputPassword: string
): Promise<boolean> {
  return bcrypt.compare(inputPassword, this.password);
};

AdminSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return token;
};

const Admin: Model<IAdmin> = model<IAdmin>("Admin", AdminSchema);
export default Admin;
