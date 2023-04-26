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
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = require("../models/User.model");
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.json("Auth routes");
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hash password
        const salt = bcrypt_1.default.genSaltSync(13);
        const hashedPassword = bcrypt_1.default.hashSync(req.body.password, salt);
        // Create the User
        yield User_model_1.User.create({
            username: req.body.username,
            email: req.body.email,
            passwordHash: hashedPassword,
        });
        res.status(201).json({ message: "User created" });
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for user
    const matchedUsers = yield User_model_1.User.find({
        username: req.body.username,
    });
    if (matchedUsers.length) {
        const currentUser = matchedUsers[0];
        // Check password
        if (bcrypt_1.default.compareSync(req.body.password, currentUser.passwordHash)) {
            // Generate token
            const token = jsonwebtoken_1.default.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: {
                    user: {
                        username: currentUser.username,
                        createdAt: currentUser.createdAt,
                        _id: currentUser._id,
                        email: currentUser.email,
                    },
                },
            }, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
            });
            res.status(200).json({ token });
            console.log(token);
        }
        else {
            res.status(403).json({ message: "Wrong password" });
        }
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
}));
router.get("/verify", isAuthenticated_1.default, (req, res) => {
    if (req.payload) {
        return res.json(req.payload.data.user);
    }
});
exports.default = router;
