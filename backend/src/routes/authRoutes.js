import express from "express";
import { body } from "express-validator";
import { register, login, getUser } from "../controllers/authController.js"
import auth  from "../middleware/auth.js";


const router = express.Router();


router.post('/register', [
    body('name').isString().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please include a valid email'),
        body('password').exists().withMessage('Password is required'),
    ],
    login
);

router.get('/me', auth, getUser);

export default router;