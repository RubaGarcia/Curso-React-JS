import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if(!bearer){
        const error =new Error('not authenticated');
        return res.status(401).json({message:error.message});
    }
    const [, token] = bearer.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(typeof decoded === 'object' && decoded.id){
            const user = await User.findById(decoded.id).select('_id name email')
            if(user){
                req.user = user;
            }else{
                res.status(500).json({error:'Token not valid'})
            }
        }
    } catch (error) {
        res.status(500).json({error:'Token not valid'})
    }


    next()
}