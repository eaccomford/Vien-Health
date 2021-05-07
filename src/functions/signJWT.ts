import config from '../config/config'
import logging from 'config/logging'
import express, {Application, Response, Request, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import UserInterface from '../interfaces/userInterface'
const NAMESPACE = 'Auth'

const signJWT = (user: UserInterface, callback: (error: Error | null, token: string| null)=> void): void => {
    var timeSinchEpock = new Date().getTime()
    var expireTime = timeSinchEpock + Number(config.server.token.expireTime) * 100000
    var expirationTimeInSeconds = Math.floor(expireTime / 1000)

    logging.info(NAMESPACE, `Attempting to sign token for ${user.username}`)

    try {
        jwt.sign({
            username: user.username,
            id: user._id
        },
        config.server.token.secret,
        {
            issuer: config.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        },
        (error, token)=>{
            if (error) {
                callback(error, null)
            }else if(token){
                callback(null, token)
            }
        })
    } catch (error) {
        logging.error(NAMESPACE, error.message, error)
        callback(error, null)
    }

}

export default signJWT