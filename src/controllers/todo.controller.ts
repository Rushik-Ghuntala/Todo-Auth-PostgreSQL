import { IResponse } from "../types/response.types"
import * as authService from '../services/auth.service'
import { Request, Response } from "express";



export const createTodo = async(req: Request, res: Response) => {
    const createTodoResponse: any = await authService.signup(req, res);

    if(createTodoResponse){
        return res.status(createTodoResponse.code).json(createTodoResponse)
    }
    else{
        return res.status(createTodoResponse.code).json({error: "createTodo Error... Controller"})
    }
}

export const fetchTodo = async(req: Request, res: Response) => {
    const fetchTodoResponse: any = await authService.signup(req, res);

    if(fetchTodoResponse){
        return res.status(fetchTodoResponse.code).json(fetchTodoResponse)
    }
    else{
        return res.status(500).json({error: "fetchTodo Error... Controller"})
    }

}