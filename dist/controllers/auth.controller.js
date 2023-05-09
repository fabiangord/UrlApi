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
exports.infoUser = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../helpers/generateToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    function checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email });
            return user;
        });
    }
    function saveUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const check = yield checkEmail(email);
                if (check) {
                    res.status(400).json({ error: 'Ya existe el usuario' });
                }
                else {
                    const user = new User_1.default({ email, password });
                    user.save();
                    const token = (0, generateToken_1.generateToken)(user.id);
                    res.status(201).json({ token });
                }
            }
            catch (error) {
                console.log(error);
                res.json({ error: 'Se produjo un error en el servidor' });
            }
        });
    }
    saveUser();
});
exports.register = register;
const login = (req, res) => {
    const { email, password } = req.body;
    function searchCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                return res.status(403).json({ error: 'Credenciales incorrectos' });
            }
            const passwordCompare = yield user.comparePassword(password);
            if (!passwordCompare) {
                return res.status(403).json({ error: 'Credenciales incorrectos' });
            }
            const token = (0, generateToken_1.generateToken)(user.id);
            res.json({ token });
        });
    }
    try {
        searchCredentials();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Problemas con el servidor' });
    }
};
exports.login = login;
const infoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.uid);
        res.json({ user });
    }
    catch (error) {
        res.status(401).json({ error: 'fallo al buscar' });
    }
});
exports.infoUser = infoUser;
