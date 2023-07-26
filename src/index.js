import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorMiddleware.js';
import routes from "./routes/index.js"
import mongoose from "mongoose";
import connectDB from "./config/database.js";

dotenv.config();

connectDB();

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();

// Middleware pour le logging
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/', routes);

// Gestion des erreurs
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
