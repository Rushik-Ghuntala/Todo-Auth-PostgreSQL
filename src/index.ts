import express, { Request, Response } from "express";
import { AppDataSource } from "./config/database";
import router from "./routes/index.routes";
import http from 'http';
import { Server } from 'socket.io';
import { socket } from './websocket/socket'
import cookieParser from 'cookie-parser'

// import express and make app instance of express
const app = express();

//load config from env file
require('dotenv').config();

// cookie-parser
app.use(cookieParser())

const PORT = process.env.PORT ?? 4000;

// middleware 
app.use(express.json());


const server = http.createServer(app);
export const io = new Server(server);

AppDataSource.initialize()
    .then(() => {
        console.log("Database ka connection successfully...")

        socket();

        // define routes and mount
        app.use('/app/v1', router)

        // app listining at port
        server.listen(PORT, () => {
            console.log(`Server Started at ${PORT}`)
        })

        //default router
        app.get('/', (req: Request, res: Response) => {
            res.send("HEllo Default routers")
        })

        // Handle Socket.IO connection error
        io.on('error', (err) => {
            console.error("Socket.IO connection error:", err);
        });

    })
    .catch((err) => {
        console.log("Error while Connecting Database...", err);
    })



