// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import JWT_SECRET_KEY from '../config/jwt.js';

const authMiddleware = (req, res, next) => {
    // Récupérer le token d'authentification du header "Authorization"
    const token = req.header('Authorization');

    // Vérifier si le token existe
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Vérifier et décoder le token en utilisant la clé secrète
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded; // Ajouter les informations de l'utilisateur au req pour un accès facile dans les autres middlewares/routes
        next(); // Appel au middleware suivant
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
};

export default authMiddleware; // Exporter le middleware par défaut
