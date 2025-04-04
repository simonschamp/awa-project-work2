"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Image_1 = require("../models/Image");
const multer_config_1 = __importDefault(require("../middleware/multer-config"));
const router = (0, express_1.Router)();
router.patch("/api/images/:id", async (req, res) => {
    try {
        const image = await Image_1.Image.findById(req.params.id);
        if (!image) {
            res.status(404).json({ message: "Image not found" });
        }
        if (image) {
            image.description = req.body.description;
            await image.save();
            res.status(200).json({ message: "Image updated" });
            console.log("Image updated");
        }
    }
    catch (error) {
        console.error(`Error while updating a file ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/api/images/:id", async (req, res) => {
    try {
        const image = await Image_1.Image.findById(req.params.id);
        if (!image) {
            res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json(image);
        console.log("Image fetched successfully from database");
    }
    catch (error) {
        console.error(`Error while fetching a file ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/api/images", async (req, res) => {
    try {
        const images = await Image_1.Image.find();
        if (!images) {
            res.status(404).json({ message: "No images found" });
        }
        res.status(200).json(images);
        console.log("Images fetched successfully from database");
    }
    catch (error) {
        console.error(`Error while fetching a file: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/api/upload", multer_config_1.default.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
        }
        if (req.file) {
            const imgPath = req.file.path.replace("public", "");
            const image = new Image_1.Image({
                filename: req.file.filename,
                description: req.body.description,
                path: imgPath,
            });
            await image.save();
            console.log("File uploaded and saved in the database");
            res
                .status(201)
                .json({ message: "File uploaded and saved in the database" });
        }
    }
    catch (error) {
        console.error(`Error while uploading file: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
