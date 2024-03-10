import { IResponse } from "../types/response.types"
import * as authService from '../services/auth.service'
import { Request, Response } from "express";



export const signup = async(req: Request, res: Response) => {
    const signupResponse: any = await authService.signup(req, res);

    // if(signupResponse){
        return res.status(signupResponse.code).json(signupResponse)
    // }
    // // else{
    //     return res.status(500).json({error: "Signup Error... Controller"})
    // // }

    // return res.status(signupResponse.code).json(signupResponse);
}

export const login = async(req: Request, res: Response) => {
    const loginRespose: any = await authService.signup(req, res);

    if(loginRespose){
        return res.status(loginRespose.code).json(loginRespose)
    }
    else{
        return res.status(loginRespose.code).json({error: "Signup Error... Controller"})
    }

}