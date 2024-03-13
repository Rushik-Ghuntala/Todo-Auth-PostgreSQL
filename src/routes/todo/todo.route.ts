import express from "express";
import { createTodo, deleteTodo, fetchTodo, updateTodo } from "../../services/todo.service";

const router = express.Router();

// define routes
router.post('/createTodo', createTodo)
router.get('/fetchTodo', fetchTodo)
router.put('/updateTodo/:todoId', updateTodo)
router.delete('/deleteTodo/:todoId', deleteTodo)



export default router;