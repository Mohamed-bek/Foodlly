"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const platSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
platSchema.index({ isMain: 1 });
const Plat = mongoose_1.default.model("Plat", platSchema);
exports.default = Plat;
