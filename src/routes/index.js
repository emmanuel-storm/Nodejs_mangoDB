import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});
router.get('/public', (req, res) => {
    res.json({ message: 'This is a public route' });
});


router.get('/users', userController.getAllUsers);
router.post('/signup', userController.signup);
router.post('/login', userController.authenticate);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


export default router;
