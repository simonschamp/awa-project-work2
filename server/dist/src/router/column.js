"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Column_1 = require("../models/Column");
const router = (0, express_1.Router)();
// Get all columns
router.get("/columns", async (req, res) => {
    try {
        const columns = await Column_1.Column.find();
        res.status(200).json(columns);
    }
    catch (error) {
        console.error("Error fetching columns:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
});
// Save or update columns
router.post("/columns", async (req, res) => {
    try {
        // Ensure request body is valid
        if (!req.body || !Array.isArray(req.body.columns)) {
            res
                .status(400)
                .json({ error: "Invalid data input. Expecting an array of columns." });
        }
        else {
            // Wipe out existing entry before inserting new columns
            await Column_1.Column.deleteMany({});
            const columns = await Column_1.Column.insertMany(req.body.columns);
            res
                .status(201)
                .json({ message: "ColabBoard saved successfully!", columns });
        }
    }
    catch (error) {
        console.error("Error saving columns:", error);
        // Method to prevent multiple response attempts
        if (!res.headersSent) {
            try {
                res.status(500).json({ error: error.message });
            }
            catch (err) {
                console.error("Failed to send error response:", err);
            }
        }
    }
});
exports.default = router;
