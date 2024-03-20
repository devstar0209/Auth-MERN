import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const saltRounds = 10;

const SECRET_KEY = process.env.SECRET_KEY || '';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate email
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign({ email: user.email }, SECRET_KEY);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // Check if email is valid
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Create user
        const newUser = new User({ email, password: hashedPassword });
        // Save user to database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
