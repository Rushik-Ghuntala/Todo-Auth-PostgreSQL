import express from "express";
import auth from './auth/auth.route'
import todo from './todo/todo.route'
const router = express.Router();

// define routes
router.use('/auth', auth)
router.use('/todo', todo)


export default router;