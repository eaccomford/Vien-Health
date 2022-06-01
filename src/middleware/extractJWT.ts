import config from "../config/config";
import logging from "config/logging";
import express, { Application, Response, Request, NextFunction } from "express";
import User from "../models/user";
const NAMESPACE = "Auth";
import jwt from "jsonwebtoken";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "validating token");
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error,
        });
      } else {
        // check that user is not logged out
        User.find({ _id: (<any>decoded).id, status: 0 })
          .exec()
          .then((users) => {
            if (users.length > 0) {
              res.locals.jwt = decoded;
              next();
            } else {
              logging.info(NAMESPACE, "validation faile, user logged out");
              return res.status(401).json({
                message: "Validation Failed",
              });
            }
          });
      }
    });
  } else {
    logging.info(NAMESPACE, "validating token");
    return res.status(401).json({
      message: "Validation Failed",
    });
  }
};

export default extractJWT;
