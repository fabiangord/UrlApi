import { Request, Response } from "express"
import modelUser from "../models/User.model"
import jwt from 'jsonwebtoken'
import { generateToken } from "../helpers/generateToken.helper"




export const register = async (req: Request, res: Response)=>{
    const {email, password} = req.body

    async function checkEmail(email:string) {
     const user = await modelUser.findOne({email})
        return user
    }   
    
    async function saveUser() {
        try {
            const check = await checkEmail(email)

            if(check){
                res.status(400).json({error: 'Ya existe el usuario'})
            }else{
                const user = new modelUser({email, password})   

                user.save()
                const token = generateToken(user.id)

                res.status(201).json({token})
            }
        
            
        } catch (error) {
            console.log(error)
            res.json({error:'Se produjo un error en el servidor'})
        }
    }
    saveUser()
}


export const login = (req: Request, res: Response)=>{

    const {email, password} = req.body

    async function searchCredentials() {
        const user = await modelUser.findOne({email})
        if(!user){
            return res.status(403).json({error: 'Credenciales incorrectos'})
        }

        const passwordCompare = await user.comparePassword(password)
        if(!passwordCompare){
            return res.status(403).json({error: 'Credenciales incorrectos'})
        }
        const token = generateToken(user.id)

        res.json({token})
    }

    try {
        searchCredentials()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Problemas con el servidor'})
    }

}


export const infoUser = async (req: Request, res: Response)=>{

    try {
        const user = await modelUser.findById(req.uid)
        res.json({user})
    } catch (error) {
        res.status(401).json({error: 'fallo al buscar'})
    }

}

