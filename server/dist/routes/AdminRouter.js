"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../controllers/AdminController");
const AdminRouter = (0, express_1.Router)();
AdminRouter.post("/login", AdminController_1.LoginAdmin);
exports.default = AdminRouter;
