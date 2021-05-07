import config from '../config/config'
import logging from 'config/logging'
import express, {Application, Response, Request, NextFunction} from 'express'
const NAMESPACE = 'Auth'
import jwt from 'jsonwebtoken'

const extractJWT = (req:Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'validating token')
    let token = req.headers.authorization?.split(' ')[1]

    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error

                })
            }else{
                res.locals.jwt = decoded
                next()
            }
        });
    }else{
        logging.info(NAMESPACE, 'validating token')
        return res.status(401).json({
            message: 'Validation Failed'
        })
    }
}

export default extractJWT