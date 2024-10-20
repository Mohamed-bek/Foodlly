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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImagePlat = exports.GetFilterPlats = exports.GetBestSellesPlats = exports.GetMainPlats = exports.GetPlat = exports.UpdatePlat = exports.DeletePlat = exports.BestSellesPlat = exports.AddPlat = void 0;
const Plate_1 = __importDefault(require("../models/Plate"));
const cloudinary_1 = require("cloudinary");
const AddPlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, subName, description, chef, price, type, isMain, isBestSelles, } = req.body;
        if (!req.file) {
            console.log("No file present");
            return res.status(400).json({ error: "No image file uploaded" });
        }
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: "foodly",
            public_id: `plat_${Date.now()}`,
            overwrite: true,
            quality: "auto", // Automatically adjust quality
            fetch_format: "auto", // Automatically select format
        }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error("Error uploading to Cloudinary:", error);
                return res
                    .status(500)
                    .json({ error: "Error uploading image to Cloudinary" });
            }
            console.log("Cloudinary upload result: ", result);
            // Create the plate info object
            const plateInfo = {
                name,
                subName,
                image: {
                    public_id: result === null || result === void 0 ? void 0 : result.public_id,
                    url: result === null || result === void 0 ? void 0 : result.secure_url,
                },
                description,
                chef,
                price,
                type,
                isMain,
                isBestSelles,
            };
            // Save the plate to the database
            const plat = yield Plate_1.default.create(plateInfo);
            console.log("Plate created: ", plat);
            res.status(200).json({ plat });
        }));
        // Start the upload stream with the file buffer
        uploadStream.end(req.file.buffer);
    }
    catch (error) {
        console.error("Error adding plate:", error);
        res.status(500).json({ error: error });
    }
});
exports.AddPlat = AddPlat;
const BestSellesPlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const plat = yield Plate_1.default.findById(id);
        if (!plat) {
            throw Error(`Could not create a Plat`);
        }
        plat.isBestSelles = true;
        yield plat.save();
        res.status(200).json({ plat });
    }
    catch (error) {
        res.status(400).json({ err: error });
    }
});
exports.BestSellesPlat = BestSellesPlat;
const DeletePlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const plat = yield Plate_1.default.findById(id);
        if (!plat) {
            throw Error(`Could not create a Plat`);
        }
        yield plat.deleteOne();
        yield plat.save();
        res.status(200).json({ plat });
    }
    catch (error) {
        res.status(400).json({ err: error });
    }
});
exports.DeletePlat = DeletePlat;
const UpdatePlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = __rest(req.body, []);
        const plat = yield Plate_1.default.findById(req.params.id);
        if (!plat) {
            throw Error(`Could not create a Plat`);
        }
        Object.assign(plat, updateData);
        yield plat.save();
        res.status(200).json({ plat });
    }
    catch (error) {
        res.status(400).json({ err: error });
    }
});
exports.UpdatePlat = UpdatePlat;
const GetPlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const plat = yield Plate_1.default.findById(id);
        if (!plat) {
            throw Error(`Could not create a Plat`);
        }
        res.status(200).json({ plat });
    }
    catch (error) {
        res.status(400).json({ err: error });
    }
});
exports.GetPlat = GetPlat;
const GetMainPlats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mainPlats = yield Plate_1.default.find({ isMain: true }).limit(4);
        if (!mainPlats) {
            throw Error(`Could not create a Plat`);
        }
        res.status(200).json({ mainPlats });
    }
    catch (error) {
        res.status(400).json({ err: error });
    }
});
exports.GetMainPlats = GetMainPlats;
const GetBestSellesPlats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bestSellesPlats = yield Plate_1.default.find({ isBestSelles: true }).limit(10);
        if (!bestSellesPlats) {
            throw Error(`Could not create a Plat`);
        }
        res.status(200).json({ bestSellesPlats });
    }
    catch (error) {
        res.status(400).json({ err: error });
    }
});
exports.GetBestSellesPlats = GetBestSellesPlats;
const GetFilterPlats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { minPrice, maxPrice, sections, rating } = req.query;
    const filter = {};
    if (minPrice)
        filter.price = Object.assign(Object.assign({}, filter.price), { $gte: Number(minPrice) });
    if (maxPrice)
        filter.price = Object.assign(Object.assign({}, filter.price), { $lte: Number(maxPrice) });
    if (rating)
        filter.rating = { $gte: Number(rating) };
    if (typeof sections === "string") {
        filter.type = { $in: sections.split(",") };
    }
    else if (Array.isArray(sections)) {
        filter.type = { $in: sections };
    }
    try {
        const plats = yield Plate_1.default.find(filter);
        res.status(200).json({ plats });
    }
    catch (error) {
        res.status(500).json({ err: error });
    }
});
exports.GetFilterPlats = GetFilterPlats;
const getOldImagePublicId = (platId) => __awaiter(void 0, void 0, void 0, function* () {
    return "portfolio/old_image";
});
const UploadImagePlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const platId = req.body.platId;
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
        if (!file) {
            return res.status(400).json({ error: "No image uploaded" });
        }
        // Step 1: Get the old image's public_id (if it exists)
        const oldImagePublicId = yield getOldImagePublicId(platId);
        // Step 2: Delete the old image from Cloudinary if it exists
        if (oldImagePublicId) {
            yield cloudinary_1.v2.uploader.destroy(oldImagePublicId);
            console.log(`Deleted old image: ${oldImagePublicId}`);
        }
        // Step 3: Upload the new image to Cloudinary
        const result = yield cloudinary_1.v2.uploader.upload(file.tempFilePath, {
            folder: "portfolio", // Optional: Store images in a folder
            public_id: `plat_${platId}`, // Use a consistent public_id for replacement
            overwrite: true, // Ensure the new upload replaces any existing image
        });
        res.json({ url: result.secure_url, public_id: result.public_id });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Upload failed" });
    }
});
exports.UploadImagePlat = UploadImagePlat;
