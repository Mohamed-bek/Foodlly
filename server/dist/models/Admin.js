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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});
AdminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        try {
            this.password = yield bcrypt_1.default.hash(this.password, 10);
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
AdminSchema.methods.comparePassword = function (inputPassword) {
    return bcrypt_1.default.compare(inputPassword, this.password);
};
AdminSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ _id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};
const Admin = (0, mongoose_1.model)("Admin", AdminSchema);
exports.default = Admin;
//# sourceMappingURL=Admin.js.map