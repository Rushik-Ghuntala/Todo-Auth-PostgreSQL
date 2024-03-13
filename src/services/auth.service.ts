import { Request, Response } from "express";
import { User } from "../entities/user.entities";
import { AppDataSource } from "../config/database";
import { Error, Success } from "../utils/response/response";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { io } from "..";
require('dotenv').config();


export const signup = async(req: Request, res: Response) => {
    try{
        // data fetch
        const {name, email, password, parentOf, childOf} = req.body;

        // Obtain the repository for the User entity
        const userRepository = AppDataSource.getRepository(User);

        // check if user already registered or not
        const existingUser = await userRepository.findOne({ where: { email: email }})

        if(existingUser){
            return Error("User Already Registered...",400);
            // return res.status(500).json({
            //     success: false,
            //     message: "User Already Registered..."
            // })
        }

        // secure password
        let hashedPassword;

        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } 
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Hashing Password...",
            });
            // try to make retry for 3 times after then give it to Error in Hashing...
        }

        // create the user
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
            parentOf,
            childOf,
        })

        const newUser = await userRepository.save(user);

        // // If parentOf is an array of user IDs, update each parent user
        // if (parentOf && Array.isArray(parentOf)) {
        //     for (const parentId of parentOf) {
        //         const parentUser = await userRepository.findOne(parentId);
        //         if (parentUser) {
        //             parentUser.parentOf = [...parentUser.parentOf, newUser.id];
        //             await userRepository.save(parentUser);
        //         }
        //     }
        // }
        
        // return Success("User Registered Seccessfully...", newUser);

        return res.status(200).json({
            success: true,
            data: newUser,
            message: "User created Successfully..."
        })

    }
    catch(err){
        console.error(err)

        return Error("Something went wrong in Signin User")
    }
}

export const login = async(req: Request, res: Response) => {
    try{
        // data fetch
        const { email, password } = req.body;

        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully... "
            })
        }

        // Obtain the repository for the User entity
        const userRepository = AppDataSource.getRepository(User);

        // check for registered user
        let user = await userRepository.findOne({where: {email: email}})

        // if user is not register
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not Registered..."
            })
        }

        const payload = {
            email: user.email,
            parentOf: user.parentOf,
            childOf: user.childOf,
            id: user.id,
        };

        // verify password and generate JWT Token
        if(await bcrypt.compare(password, user.password)){
            // if password matched 

            // -> crete JWT Token
            let token = jwt.sign(
                payload, 
                process.env.JWT_SECRET as any,
                {
                expiresIn: "2h"
                }
            );

            // user k object me token add kar dia
            user.token = token;

            // user ke object mese password hata dia.. database me still available hai
            user.password = "";

            // -> create Cookie
            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in Successfully..."
            });
            
        }
        else{
            // if password do not matched
            return res.status(403).json({
                success: false,
                message: "Password Incorrect..."
            })
        }
    }
    catch(err){
        console.error(err)

        res.status(500).json({
            success: false,
            message: "Login Failed..."
        })
    }
}