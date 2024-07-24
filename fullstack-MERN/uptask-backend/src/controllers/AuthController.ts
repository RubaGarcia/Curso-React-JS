import type {Request, Response} from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import { hashPassword } from '../utils/auth'

export class AuthController{

    static createAccount = async(req:Request, res:Response) => {
        try {
            const {password, email} = req.body
            const user = new User(req.body)
            
            
            
            user.password= await hashPassword(password)
            
            await user.save()


            res.send('cuenta creada, confirmala')
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'An error ocurred'})
            
        }
    }



}