import { Request, Response } from "express";
import { AppDataSource } from "./config/database";
import router from "./routes/index.routes";

// import express and make app instance of express
const express = require("express")
const app = express();

//load config from env file
require('dotenv').config();

// cookie-parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const PORT = process.env.PORT ?? 4000;

// middleware 
app.use(express.json());




AppDataSource.initialize()
    .then(async () => {
        console.log("Database ka connection successfully...")

        

        // define routes and mount
        app.use('/app/v1', router)

        // app.get('/*', (req: Request, res: Response) => {
        //     return res.status(400).json({
        //         error: "Error..",
        //         message: "Route not deinfed yet..."
        //     })
        // })

        // app listining at port
        app.listen(PORT, () => {
            console.log(`Server Started ar ${PORT}`)
        })

    })
    .catch((err) => {
        console.log("Error while Connecting Database...", err);
    })



