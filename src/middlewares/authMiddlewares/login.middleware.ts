import { body } from "express-validator"

export const loginFormat = [
    body('email', 'Formato email no valido')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Minimo 5 caracteres de contraseña')
        .trim()
        .isLength({min:5})
]