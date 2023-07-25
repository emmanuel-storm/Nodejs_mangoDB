import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello, this is your API!' });
});

export default router;
