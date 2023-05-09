import {validationResult, body} from 'express-validator'
import { Request, Response, NextFunction } from 'express-serve-static-core'

export const validationEmailRegister = (req: Request, res: Response, next: NextFunction)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        next()
    }

}

export const registerFormat = [
    body('email', 'Formato email no valido')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Minimo 5 caracteres de contraseña')
        .trim()
        .isLength({min:5}),
    body('password', 'Formato password no valido')
        .custom((value, {req})=>{
            if(value != req.body.repassword){
                throw new Error('Las contraseñas no coinciden')
            }else{
                return value
            }
        })
]