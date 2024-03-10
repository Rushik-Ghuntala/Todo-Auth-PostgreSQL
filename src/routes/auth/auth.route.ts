import express from "express";
import { login, signup } from "../../services/auth.service";
import { loggerMiddleware } from "../../middlewares/logger";
import { Create } from '../../validators/auth/signup.validator'
import { Validate } from "../../middlewares/validate";
import auth from "../../middlewares/auth";
const router = express.Router();

// define routes
router.post('/signup',Validate(Create), signup)
router.post('/login',loggerMiddleware, login)

// testing protected routes for single middleware
router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: " Welcome to the Protected Routes of TEST..."
    })
})


export default router;