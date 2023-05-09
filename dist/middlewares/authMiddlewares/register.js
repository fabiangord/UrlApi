"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormat = exports.validationEmailRegister = void 0;
const express_validator_1 = require("express-validator");
const validationEmailRegister = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.validationEmailRegister = validationEmailRegister;
exports.registerFormat = [
    (0, express_validator_1.body)('email', 'Formato email no valido')
        .trim()
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.body)('password', 'Minimo 5 caracteres de contraseña')
        .trim()
        .isLength({ min: 5 }),
    (0, express_validator_1.body)('password', 'Formato password no valido')
        .custom((value, { req }) => {
        if (value != req.body.repassword) {
            throw new Error('Las contraseñas no coinciden');
        }
        else {
            return value;
        }
    })
];
