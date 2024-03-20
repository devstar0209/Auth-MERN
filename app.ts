import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/clikkle');

app.use(cors())
app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
