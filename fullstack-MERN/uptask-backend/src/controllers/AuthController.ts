import type {Request, Response} from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import { hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { transporter } from '../config/nodemailer'
import { AuthEmail } from '../config/emails/AuthEmail'
import { generateJWT } from '../utils/jwt'
import { ObjectId } from 'mongoose'

export class AuthController{

    static createAccount = async(req:Request, res:Response) => {
        try {
            const {password, email} = req.body
            const user = new User(req.body)
            
            const userExists = await User.findOne({email})
            if(userExists){
                const error = new Error('El usuario ya existe')
                return res.status(409).json({error:error.message})
            }


            user.password= await hashPassword(password)
            
            const token =new Token()
            token.token = generateToken()
            token.user = user.id

            AuthEmail.sendConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })


            Promise.allSettled([user.save(), token.save()])
            res.send('cuenta creada, confirmala')
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'An error ocurred'})
            
        }
    }

    static confirmAccount = async(req:Request, res:Response) => {
        try {
    

            const {token} = req.body
            const tokenExists = await Token.findOne({token})
            if(!tokenExists){
                const error = new Error('Token inválido')
                return res.status(401).json({error:error.message})
            }
            // console.log(tokenExists)
            const user = await User.findById(tokenExists.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            res.send('Cuenta confirmada')
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'An error ocurred'})
            
        }
    }

    static login = async(req:Request, res:Response) => {
        try {
    
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error:error.message})
            }

            if(!user.confirmed){

                const token = new Token()
                token.user = user.id
                token.token = generateToken()
                await token.save()

                const error = new Error('Usuario no confirmado')
                return res.status(401).json({error:error.message})
            }


            const passwordMatch = await bcrypt.compare(password, user.password)
            if(!passwordMatch){
                const error = new Error('Contraseña incorrecta')
                return res.status(401).json({error:error.message})
            }
            
            const token = generateJWT({id: user._id as ObjectId})

            res.send(token)
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'An error ocurred'})
            
        }
    }
    static requestConfirmationCode = async(req:Request, res:Response) => {
        try {
            const { email} = req.body
            
            const user = await User.findOne({email})
            if(!user){
                const error = new Error('El usuario no existe')
                return res.status(409).json({error:error.message})
            }

            if(user.confirmed){
                const error = new Error('El usuario ya está confirmado')
                return res.status(409).json({error:error.message})
            }
            
            const token =new Token()
            token.token = generateToken()
            token.user = user.id

            AuthEmail.sendConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })


            Promise.allSettled([user.save(), token.save()])
            res.send('se envió un token')
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'An error ocurred'})
            
        }
    }


    static forgotPassword = async(req:Request, res:Response) => {
        try {
            const { email} = req.body
            
            const user = await User.findOne({email})
            if(!user){
                const error = new Error('El usuario no existe')
                return res.status(409).json({error:error.message})
            }

            
            const token =new Token()
            token.token = generateToken()
            token.user = user.id
            await token.save()

            AuthEmail.sendPasswordResetToken({
                email:user.email,
                name:user.name,
                token:token.token
            })


            res.send('Revisa tu e-mail')
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'An error ocurred'})
            
        }
    }


    static validateToken = async(req:Request, res:Response) => {
        try {
            const {token} = req.body
            const tokenExists = await Token.findOne({token})
            if(!tokenExists){
                const error = new Error('Token inválido')
                return res.status(401).json({error:error.message})
            }
            // console.log(tokenExists)
            

            res.send('Token valido, define tu nueva contraseña')
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'An error ocurred'})
            
        }
    }

    static updatePasswordWithToken = async(req:Request, res:Response) => {
        try {
            const {token} = req.params
            const{password} = req.body
            const tokenExists = await Token.findOne({token})
            if(!tokenExists){
                const error = new Error('Token inválido')
                return res.status(401).json({error:error.message})
            }
            // console.log(tokenExists)
            const user = await User.findById(tokenExists.user)
            user.password = await hashPassword(password)

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])


            res.send('contraseña modificada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'An error ocurred'})
            
        }
    }
}