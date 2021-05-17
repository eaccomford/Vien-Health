import logging from 'config/logging'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/user'
import signJWT from '../services/signJWT'
import express, { Application, Response, Request, NextFunction } from 'express'
const NAMESPACE = "User"


const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Success, User granted access")
    return res.status(200).json({
        message: 'Successfully Athorized'
    })
}
const register = (req: Request, res: Response, next: NextFunction) => {

    // no validation yet
    let { firstname, lastname, username, password } = req.body

    User.find({ username }).exec()
        .then((users) => {
            if (users.length > 0) {
                logging.info(NAMESPACE, "Err, username is already taken")
                return res.status(401).json({
                    message: 'username is already taken',
                    username: username
                })
            } else {
                bcrypt.hash(password, 3, (hashError, hash) => {
                    if (hashError) {
                        return res.status(500).json({
                            message: hashError.message,
                            error: hashError
                        })
                    }

                    const _user = new User(
                        {
                            _id: new mongoose.Types.ObjectId(),
                            firstname,
                            lastname,
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

        })
}
const login = (req: Request, res: Response, next: NextFunction) => {
    // validate request
    let { username, password } = req.body

    User.find({ username }).exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorised login'
                })
            }
            bcrypt.compare(password, users[0].password, (_,err) => {
                console.log('errrrr');
                console.log(err);
                
                if (!err) {
                    logging.error(NAMESPACE, 'wrong username or password', err);
                    return res.status(401).json({
                        message: 'Invalid credentials'
                    })
                } else {
                    signJWT(users[0], (_error, token) => {
                        if (_error) {
                            logging.error(NAMESPACE, 'SignJWT Error', err);
                            return res.status(401).json({
                                message: 'Unauthorised - token not signed for user', error: _error
                            })
                        } else if (token) {
                            // update user status
                            console.log('updating reecord', users[0].id )
                            
                            try {
                                const filter = { _id: users[0].id };
                                const update = {  $set:{status: 0} };
                                let user = User.findOneAndUpdate(filter, update, {
                                    returnOriginal: true
                                }, function( error, result){
                                    console.log('error---');
                                    console.log(result);
                                    
                                });
                                
                                // return success if status is set to 0 (on)
                                return res.status(200).json({
                                    message: 'success', token, user: users[0]
                                })
                            } catch (error) {
                                return res.status(201).json({ error })
                            }

                           
                        }
                    })
                }
            })
        }).catch(error => {
            return res.status(500).json({
                message: error.message, error: error
            })
        })

}
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });

}
const logoutUser =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        // turn user status to 1 (logoud out)
        const filter = { _id: req.body.id };
        const update = { status: 1 };
        let user = await User.findOneAndUpdate(filter, update, {
            returnOriginal: true
        });

        return res.status(200).json({ success: 'user logged out' })
    } catch (error) {
        return res.status(401).json({ "Error": error })
    }
}




export default { validateToken, register, login, getAllUsers, logoutUser }