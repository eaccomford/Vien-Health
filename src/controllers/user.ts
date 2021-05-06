import logging from 'config/logging'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/user'
import signJWT from '../functions/signJWT'
import express, {Application, Response, Request, NextFunction} from 'express'
const NAMESPACE = "User"


const validateToken = (req:Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Success, User granted access")
    return res.status(200).json({
        message: 'Successfully Athorized'
    })
}
const register = (req:Request, res: Response, next: NextFunction) => {
    
    // no validation yet
    let {username, password} = req.body
    bcrypt.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            })
        }
        
        const _user = new User(
           {
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash
           }
        )

        return _user.save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });

    })
}
const login = (req:Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'Successfully Athorized'
    })
    
}
const getAllUsers = (req:Request, res: Response, next: NextFunction) => {
    User.find()
        .exec()
        .then((books) => {
            return res.status(200).json({
                books: books,
                count: books.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    
}

export default {validateToken, register, login, getAllUsers}