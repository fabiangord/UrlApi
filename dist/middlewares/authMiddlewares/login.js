"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFormat = void 0;
const express_validator_1 = require("express-validator");
exports.loginFormat = [
    (0, express_validator_1.body)('email', 'Formato email no valido')
        .trim()
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.body)('password', 'Minimo 5 caracteres de contraseña')
        .trim()
        .isLength({ min: 5 })
];
