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
exports.getOrder = exports.confirmOrder = exports.deleteOrder = exports.getOrders = exports.makeOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Plate_1 = __importDefault(require("../models/Plate"));
const makeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order, location, name, phone } = req.body;
        if (!order || !Array.isArray(order) || order.length === 0) {
            throw Error("Order items are required");
        }
        const plateIds = order.map((item) => item.plat);
        const foundPlates = yield Plate_1.default.find({ _id: { $in: plateIds } });
        if (foundPlates.length !== plateIds.length) {
            throw Error("Some plates do not exist");
        }
        const newOrder = new Order_1.default({ order, location, name, phone });
        yield newOrder.save();
        res
            .status(201)
            .json({ message: "Order created successfully", order: newOrder });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.makeOrder = makeOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const orders = yield Order_1.default.find({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});
exports.getOrders = getOrders;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield Order_1.default.findById(id);
        if (!order) {
            throw new Error("Order not found");
        }
        yield order.deleteOne();
        res.status(200).json({ message: "order deleted successfully" });
    }
    catch (error) {
        res.status(error.status | 500).json({ error });
    }
});
exports.deleteOrder = deleteOrder;
const confirmOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield Order_1.default.findById(id);
        if (!order) {
            throw new Error("Order not found");
        }
        order.isConfirmed = true;
        yield order.save();
        res.status(200).json({ message: "order confirmed successfully" });
    }
    catch (error) {
        res.status(error.status | 500).json({ error });
    }
});
exports.confirmOrder = confirmOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield Order_1.default.findById(id).populate({
            path: "order.plat",
            model: "Plat",
        });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    }
    catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getOrder = getOrder;
//# sourceMappingURL=OrderController.js.map