import config from "config/config";
import bodyParser from 'body-parser';
import logging from "config/logging";
import express, { Application, Request, Response, NextFunction } from "express"
import mongoose from 'mongoose'
import routes from 'routes/index'
var cors = require("cors");
// import * as cors from 'cors' // try this


const NAMESPACE = 'Server';

const app: Application = express()
app.use(cors());

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })

    next();
});






/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



export default function createServer() {
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.send('hello word')
    })

    app.use(routes)
    return app
}