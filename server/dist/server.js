"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const PlatRouter_1 = __importDefault(require("./routes/PlatRouter"));
const AdminRouter_1 = __importDefault(require("./routes/AdminRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const OrderRouter_1 = __importDefault(require("./routes/OrderRouter"));
const cloudinary_1 = require("cloudinary");
const cors_1 = __importDefault(require("cors"));
const ReservationRouter_1 = __importDefault(require("./routes/ReservationRouter"));
// Use CORS middleware
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.CLOUD_API_NAME,
    api_secret: process.env.CLOUDE_KEY,
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Enable credentials (cookies) to be sent
}));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(AdminRouter_1.default);
app.use(PlatRouter_1.default);
app.use(ReservationRouter_1.default);
app.use(OrderRouter_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
// Example route
app.get("/", (req, res) => {
    res.send("Welcome to Foodly API!");
});
// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
// import Admin from "./models/Admin"; // Adjust path accordingly
// async function createAdmin() {
//   const admin = new Admin({
//     username: "admin",
//     password: "secure-password",
//     email: "admin@example.com",
//   });
//   try {
//     await admin.save();
//     console.log("Admin created successfully!");
//   } catch (error) {
//     console.error("Error creating admin:", error);
//   }
// }
// createAdmin();
