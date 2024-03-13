import express from "express";
import auth from './auth/auth.route'
import todo from './todo/todo.route'
import childTodo from './todo/childTodo.route'
const router = express.Router();

// define routes
router.use('/auth', auth)
router.use('/todo', todo)
router.use('/todo/child', childTodo)


export default router;