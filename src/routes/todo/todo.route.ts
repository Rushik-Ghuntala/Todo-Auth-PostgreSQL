import express from "express";
import { createTodo, deleteTodo, fetchTodo, updateTodo } from "../../services/todo.service";
import { childCreateTodo, childDeleteTodo, childFetchTodo, childUpdateTodo } from "../../services/childTodo.service";

const router = express.Router();

// define routes
router.post('/createTodo', createTodo)
router.post('/child/createTodo', childCreateTodo)
router.get('/fetchTodo', fetchTodo)
router.get('/child/fetchTodo', childFetchTodo)
router.put('/updateTodo/:todoId', updateTodo)
router.put('/child/updateTodo/:todoId', childUpdateTodo)
router.delete('/deleteTodo/:todoId', deleteTodo)
router.delete('/child/deleteTodo/:todoId', childDeleteTodo)



export default router;