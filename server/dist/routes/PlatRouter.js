"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlatController_1 = require("../controllers/PlatController");
const Auth_1 = require("../middelware/Auth");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const PlatRouter = (0, express_1.Router)();
PlatRouter.post("/plat", Auth_1.authMiddleware, upload.single("file"), PlatController_1.AddPlat);
PlatRouter.put("/plat/:id", Auth_1.authMiddleware, PlatController_1.UpdatePlat);
PlatRouter.delete("/plat", Auth_1.authMiddleware, PlatController_1.DeletePlat);
PlatRouter.get("/plat/:id", PlatController_1.GetPlat);
PlatRouter.get("/plats", PlatController_1.GetFilterPlats);
PlatRouter.get("/main-plats", PlatController_1.GetMainPlats);
PlatRouter.get("/best-selles-plats", PlatController_1.GetBestSellesPlats);
exports.default = PlatRouter;
//# sourceMappingURL=PlatRouter.js.map