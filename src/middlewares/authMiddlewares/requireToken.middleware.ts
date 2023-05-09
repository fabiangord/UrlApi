import {Request, Response ,NextFunction} from "express"
import  jwt, { JwtPayload }  from "jsonwebtoken"




export const requireToken = (req: Request, res:Response, next:NextFunction) =>{
    try {
        let token = req.headers?.authorization
            if(!token){
                throw new Error('Usa el formato Bearer') 
            }

        token = token.split(' ')[1]

        const {uid} = jwt.verify(token, process.env.JWT!) as JwtPayload

        req.uid = uid 

        console.log(req)

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({error: error})
    }
}