import express from "express";
import { childCreateTodo, childDeleteTodo, childFetchTodo, childUpdateTodo } from "../../services/childTodo.service";

const router = express.Router();

// define routes
router.post('/createTodo', childCreateTodo)
router.get('/fetchTodo', childFetchTodo)
router.put('/updateTodo/:todoId', childUpdateTodo)
router.delete('/deleteTodo/:todoId', childDeleteTodo)



export default router;