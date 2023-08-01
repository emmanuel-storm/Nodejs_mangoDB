import jwt from 'jsonwebtoken';
import JWT_SECRET_KEY from '../config/jwt.js';

export const createJWT = (userData) => {
    return jwt.sign(userData, JWT_SECRET_KEY, {expiresIn: '1h'});
};
