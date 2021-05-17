import logging from 'config/logging'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import PageContent from '../models/pageContent'
import signJWT from '../services/signJWT'
import express, { Application, Response, Request, NextFunction } from 'express'
const NAMESPACE = "PageContent"


const upload = require("../services/upload");


const profile = async (req: Request, res: Response) => {
    try {
        let { page, title, subtitle, body, url, file, status } = req.body

        const _pageConrtent = new PageContent(
            {
                _id: new mongoose.Types.ObjectId(),
                page,
                title,
                subtitle,
                body,
                url, file, status
            }
        )
        await upload(req, res);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        _pageConrtent.file = req.file.path

        return _pageConrtent.save()
            .then((result) => {
                return res.status(201).json({
                    pageContent: result
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });

    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
}

const store = (req: Request, res: Response, next: NextFunction) => {


    let { page, title, subtitle, body, url, file, status } = req.body

    const _pageConrtent = new PageContent(
        {
            _id: new mongoose.Types.ObjectId(),
            page,
            title,
            subtitle,
            body,
            url, file, status
        }
    )

    return _pageConrtent.save()
        .then((result) => {
            return res.status(201).json({
                pageContent: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

const getPages = (req: Request, res: Response, next: NextFunction) => {
    PageContent.find()
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





export default { store, getPages, profile }