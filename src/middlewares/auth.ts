import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken')
require("dotenv").config()


const auth = (req: Request, res: Response, next: NextFunction) => {
    try{
        // extract the JWT Token -> can fetch from headers, cookeie and body
        const token = req.body.token || req.cookies.token ;

        console.log("cookie token: ", req.cookies.token)
        console.log("body token: ", req.body.token)
        console.log("Header token: ", req.header("Authorization"))

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing..."
            })
        }

        // verified the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log("Payload  Token: ", payload)

            // req ni body ma add karva payload no data....
            const rushik = req.body.user = payload;
            console.log("req.body.user:" , rushik)
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message: "Token is Invalid..."
            })
        }

        next();
    }
    catch(err){
        console.error(err)

        return res.status(401).json({
            success: false,
            message: "Something went wrong, while verifing the token...",
            err: err
        })
    }
}

export default auth;