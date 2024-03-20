import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginUser, registerUser } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
