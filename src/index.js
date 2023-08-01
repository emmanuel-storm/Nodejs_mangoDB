import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from "./routes/index.js"
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import { transports, format } from 'winston';
import * as expressWinston from "express-winston";
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

export const app = express();

app.use(expressWinston.errorLogger({
    transports: [
        new transports.File({ filename: 'logs/error.log' })
    ],
    format: format.combine(
        format.timestamp(),
        format.json()
    )
}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
