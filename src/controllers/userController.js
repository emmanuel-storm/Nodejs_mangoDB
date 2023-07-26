import User from '../models/User.js';
import bcrypt from 'bcrypt';

const userController = {
    async signup(req, res) {
        try {
            const { username, email, password } = req.body;

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(409).json({ error: 'Username already taken' });
            }

            console.log('Received data from request:', req.body);

            // Hachage du mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password:', hashedPassword);

            // Créer un nouvel utilisateur
            const newUser = new User({ username, email ,password: hashedPassword });
            await newUser.save();

            console.log('New user created:', newUser);

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong when trying to add user!' });
        }
    },

    // Ajoutez d'autres méthodes pour les autres actions (par exemple, login, update, delete, etc.)
};

export default userController;
