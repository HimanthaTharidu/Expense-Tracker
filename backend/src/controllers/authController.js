import jwt from "jsonwebtoken";
import { validationResult} from "express-validator";
import bcrypt from "bcryptjs"
import User from "../models/User.js"

const generateToken = (userID) => {
    return jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: '7d'});
};


export async function register(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400);
        const err = new Error('Validatoin Failed');
        err.details = errors.array();
        return next(err)
    }

    try {
        const {name, email, password} = req.body;

        if (await User.findOne({email})){
            res.status(400);
            throw new Error('User already exist');
        };

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, hashPassword});

        res.status(201).json({
        token: generateToken(user._id),
        user: { id: user._id, name: user.name, email: user.email },
    });
    } catch (error) {
        next(error);
    }
};

export async function login(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400);
        const err = new Error('Validatoin Failed');
        err.details = errors.array();
        return next(err)
    };

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.hashPassword))){
            res.json({
                token: generateToken(user._id),
                user: {id: user._id, name: user.name, email: user.email}
            });
        }else{
            res.status(401);
            throw new Error('Invalid email or password')
        }
    } catch (error) {
        next(error);
    }
};

export async function getUser(req, res, next){
    try {
        const user = await User.findById(req.user.userID).select('-hashPassword');
        if(!user){
            res.status(404);
            throw new Error('User not found')
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export default {register, login, getUser}