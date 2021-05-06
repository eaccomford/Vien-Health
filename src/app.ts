import 'dotenv/config'
import express, {Application, Response, Request, NextFunction} from 'express'
import createServer from 'server'

const startServer = () => {
    const app = createServer()
    const port = parseInt(<string>process.env.PORT, 10) || 4000

    app.listen(port, () => {
        console.log(`server listening at port ${port}`);
        
    })
}

startServer()