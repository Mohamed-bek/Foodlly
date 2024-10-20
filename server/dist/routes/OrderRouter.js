"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controllers/OrderController");
const Auth_1 = require("../middelware/Auth");
const OrderRouter = (0, express_1.Router)();
OrderRouter.post("/order", OrderController_1.makeOrder);
OrderRouter.get("/orders", Auth_1.authMiddleware, OrderController_1.getOrders);
OrderRouter.get("/order/:id", Auth_1.authMiddleware, OrderController_1.getOrder);
OrderRouter.put("/order/:id", Auth_1.authMiddleware, OrderController_1.confirmOrder);
OrderRouter.delete("/order/:id", Auth_1.authMiddleware, OrderController_1.deleteOrder);
exports.default = OrderRouter;
//# sourceMappingURL=OrderRouter.js.map