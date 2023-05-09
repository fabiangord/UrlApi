import jwt from 'jsonwebtoken'

export const generateToken = (uid:string)=>{

    const timeSession = 60 * 15

    try {
        
        const token = jwt.sign({uid}, process.env.JWT!, {expiresIn: timeSession})
        return {token, timeSession}

    } catch (error) {
        console.log(error)
    }
}