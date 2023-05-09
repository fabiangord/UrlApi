"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (uid) => {
    const timeSession = 60 * 15;
    try {
        const token = jsonwebtoken_1.default.sign({ uid }, process.env.JWT, { expiresIn: timeSession });
        return { token, timeSession };
    }
    catch (error) {
        console.log(error);
    }
};
exports.generateToken = generateToken;
