"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.LoginAdmin = void 0;
const cookie_1 = require("cookie");
const Admin_1 = __importDefault(require("../models/Admin"));
const LoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("register");
        const { username, password } = req.body;
        const admin = yield Admin_1.default.findOne({ username });
        if (!admin) {
            throw Error("Admin not found");
        }
        const isMatch = yield admin.comparePassword(password);
        if (!isMatch) {
            throw Error("Invalid password");
        }
        const token = admin.generateAuthToken();
        console.log("token", token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
        });
        res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        res.status(error.status || 500).json({ err: error.message });
    }
});
exports.LoginAdmin = LoginAdmin;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.setHeader("Set-Cookie", (0, cookie_1.serialize)("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        }));
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        res.status(400).json({ err: error });
    }
});
exports.Logout = Logout;
//# sourceMappingURL=AdminController.js.map