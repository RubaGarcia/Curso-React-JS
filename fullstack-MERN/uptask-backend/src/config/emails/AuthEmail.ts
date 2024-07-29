import { transporter } from "../nodemailer"

interface IEmail{
    email:string
    name:string
    token:string    
}




export class AuthEmail{


    static sendConfirmationEmail = async ( user:IEmail ) =>{
        const info = await transporter.sendMail({
            from:'UpTask <admin@uptask.com>',
            to: user.email,
            subject:'Confirma tu cuenta',
            text:'Confirma tu cuenta',
            html:`
            <p>Hola ${user.name}, has creado tu cuenta en UpTask, ya casi está todo listo, solo debes confirmar tu cuenta</p>
            <p>Para confirmar tu cuenta, haz click en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            <p> E ingresa el código <b>${user.token}</b></p>
            <p>Este token expirará en 10 minutos</p>
            `
        })
    }


    static sendPasswordResetToken = async ( user:IEmail ) =>{
        const info = await transporter.sendMail({
            from:'UpTask <admin@uptask.com>',
            to: user.email,
            subject:'Reestablece tu contraseña',
            text:'Reestablece tu contraseña',
            html:`
            <p>Hola ${user.name}, has solicitado el reestablecimiento de tu contraseña ahora</p>
            <p>Para confirmar tu cuenta, haz click en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer contraseña</a>
            <p> E ingresa el código <b>${user.token}</b></p>
            <p>Este token expirará en 10 minutos</p>
            `
        })
    }

}