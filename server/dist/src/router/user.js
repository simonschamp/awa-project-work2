"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const validateToken_1 = require("../middleware/validateToken");
const router = (0, express_1.Router)();
router.post("/register", (0, express_validator_1.body)("username").trim().isLength({ min: 3 }).escape(), (0, express_validator_1.body)("password").isLength({ min: 5 }), async (req, res) => {
    // we trying to validate the  user inputs
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const existingUser = await User_1.User.findOne({
            username: req.body.username,
        });
        console.log(existingUser);
        if (existingUser) {
            res.status(403).json({ username: "username already in use" });
        }
        // we salt the password
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(req.body.password, salt);
        // save the username and the hash to the database
        await User_1.User.create({
            username: req.body.username,
            password: hash,
        });
        res.status(200).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Login
router.post("/login", (0, express_validator_1.body)("username").trim().escape(), (0, express_validator_1.body)("password").escape(), async (req, res) => {
    try {
        const user = await User_1.User.findOne({
            username: req.body.username,
        });
        //console.log(user)
        if (!user) {
            res.status(403).json({ message: "Login failed" });
        }
        if (user)
            if (bcrypt_1.default.compareSync(req.body.password, user.password)) {
                const jwtPayload = {
                    id: user._id,
                    username: user.username,
                };
                const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET, { expiresIn: "2m" });
                res.status(200).json({ success: "true", token });
            }
            else {
                res.status(401).json({ message: "Login failed" });
            }
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// way to get list of users
router.get("/list", validateToken_1.validateToken, async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(`Error while fecthing users ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = router;
