import { Request, Response } from "express";
require('dotenv').config();
import jwt, {JwtPayload} from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { Todo } from "../entities/todo.entities";
import { User } from "../entities/user.entities";

export const childCreateTodo = async(req: Request, res: Response) => {
    try {
        const payload: JwtPayload = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string) as JwtPayload;
        console.log("Todo ma chhu aa le payload: ", payload);

        let currentUserId = payload.id;
        console.log(currentUserId);

        const childId = payload.parentOf;
        currentUserId = childId;

        
        // Data fetch
        const { title, description } = req.body;

        // Obtain the repository for the to do entity
        const todoRepository = AppDataSource.getRepository(Todo);

        if(currentUserId === 0){
            return res.status(200).json({
                success: false,
                message: "You have not child..."
            })
        }

        const newTodo = todoRepository.create({
            title: title,
            description: description,
        });
        await todoRepository.save(newTodo);

        // Obtain the repository for the User Entity
        const userRepository = AppDataSource.getRepository(User);

        // Find the user by ID
        let existingUser = await userRepository.findOne({ where: { id: currentUserId }, relations: ["todos"] });

        if (existingUser) {
            // Push new todo to the user's todos array
            existingUser.todos.push(newTodo);
            await userRepository.save(existingUser);

            return res.status(200).json({
                success: true,
                data: newTodo,
                message: `User ${currentUserId} Todo Added Successfully...`
            });
        } else {
            // Return error if user does not exist
            return res.status(404).json({
                success: false,
                message: 'User not found...'
            });
        }

        
    } catch(err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: 'Error in creating todo...'
        });
    }
}


export const childFetchTodo = async(req: Request, res: Response) => {
    try{
        const payload: JwtPayload = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string) as JwtPayload;
        console.log("Todo ma chhu aa le payload: ", payload);

        let currentUserId = payload.id;
        console.log("currentUserId: ", currentUserId);

        const childId = payload.parentOf;

        currentUserId = childId;

        // Obtain the repository for the User Entity
        const userRepository = AppDataSource.getRepository(User);

        if(currentUserId === 0){
            return res.status(200).json({
                success: false,
                message: "You have not child..."
            })
        }

        // Find the user by ID
        let existingUser = await userRepository.findOne({ where: { id: currentUserId }, relations: ["todos"] });

        console.log("todos: ", existingUser?.todos)
        const todos = existingUser?.todos;

        return res.status(200).json({
            success: true,
            data: todos,
            message: `User ${currentUserId} Todo Fetched Successfully...`
        });

    }
    catch(err){
        console.error(err);

        return res.status(500).json({
            success: false,
            message: 'Error in fetching todo...'
        });
    }
}

export const childUpdateTodo = async(req: Request, res: Response) => {
    try{
        const payload: JwtPayload = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string) as JwtPayload;
        console.log("Todo ma chhu aa le payload: ", payload);

        let currentUserId = payload.id;
        console.log(currentUserId);

        const childId = payload.parentOf;

        currentUserId = childId;

        // Data fetch
        const todoId = parseInt(req.params.todoId);
        const { title, description } = req.body;

        if(currentUserId === 0){
            return res.status(200).json({
                success: false,
                message: "You have not child..."
            })
        }

        // Obtain the repository for the to do entity
        const todoRepository = AppDataSource.getRepository(Todo);
        const userRepository = AppDataSource.getRepository(User);
        const userWithTodos = await userRepository.findOne({ 
                where: { id: currentUserId }, 
                relations: ["todos"] // Load todos relation
            });
        // console.log("user ka todo", userWithTodos?.todos)

        const existingTodo = userWithTodos?.todos.find(todo => todo.id === todoId);

        if(existingTodo){
            existingTodo.title = title,
            existingTodo.description = description

            await todoRepository.save(existingTodo);

            return res.status(200).json({
                success: true,
                data: existingTodo,
                message: `User ${currentUserId} Todo Updated Successfully...`
            });
        }
        else{
            return res.status(500).json({
                success: false,
                message: 'Id is not exist in Users Todo'
            });
        }

    }
    catch(err){
        console.error(err);

        return res.status(500).json({
            success: false,
            message: 'Error in fetching todo...'
        });
    }
}

export const childDeleteTodo = async(req: Request, res: Response) => {
    try{
        const payload: JwtPayload = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string) as JwtPayload;
        console.log("Todo ma chhu aa le payload: ", payload);

        let currentUserId = payload.id;
        console.log(currentUserId);

        const childId = payload.parentOf;

        currentUserId = childId;


        // Data fetch
        const todoId = parseInt(req.params.todoId);

        if(currentUserId === 0){
            return res.status(200).json({
                success: false,
                message: "You have not child..."
            })
        }

        // Obtain the repository for the to do entity
        const todoRepository = AppDataSource.getRepository(Todo);
        const userRepository = AppDataSource.getRepository(User);
        const userWithTodos = await userRepository.findOne({ 
                where: { id: currentUserId }, 
                relations: ["todos"] // Load todos relation
            });
        // console.log("user ka todo", userWithTodos?.todos)

        const existingTodo = userWithTodos?.todos.find(todo => todo.id === todoId);

        if(existingTodo){
            await todoRepository.delete(todoId);

            return res.status(200).json({
                success: true,
                data: existingTodo,
                message: `User ${currentUserId} Todo Deleted Successfully...`
            });
        }
        else{
            return res.status(500).json({
                success: false,
                message: 'Id is not exist in Users Todo'
            });
        }

    }
    catch(err){
        console.error(err);

        return res.status(500).json({
            success: false,
            message: 'Error in fetching todo...'
        });
    }
}
