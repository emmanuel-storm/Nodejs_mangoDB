// routes/index.js

import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes publiques (non protégées)
router.post('/signup', userController.signup);
// Ajouter d'autres routes publiques ici

// Routes protégées (authentification requise)
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});
// Ajouter d'autres routes protégées ici

// routes publiques
router.get('/public', (req, res) => {
    res.json({ message: 'This is a public route' });
});



export default router;
