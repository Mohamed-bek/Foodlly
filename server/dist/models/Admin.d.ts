import { Document, Model } from "mongoose";
interface IAdmin extends Document {
    username: string;
    password: string;
    email: string;
    comparePassword(inputPassword: string): Promise<boolean>;
    generateAuthToken(): string;
}
declare const Admin: Model<IAdmin>;
export default Admin;
