// src/config/jwt.js
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

export default JWT_SECRET_KEY;
