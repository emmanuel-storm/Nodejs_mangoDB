import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createJWT } from '../helpers/jwtHelpers.js';
import UserDTO from "../dto/UsersDTO.js";

const userController = {

    async authenticate(req, res) {
        try {
            const { emailOrUsername, password } = req.body;
            console.log('emailOrUsername:', emailOrUsername);
            console.log('password:', password);
            const user = await User.findOne({
                $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
            });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            console.log('User:', user);
            console.log('User ID:', user._id);
            console.log('User Password:', user.password);

            const userData = { userId: user._id, username: user.username };
            const token = createJWT(userData);

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong during login.' });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.find();

            const usersDTO = users.map(user => new UserDTO(user.username, user.email));

            res.status(200).json(usersDTO);
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong when trying to get all users!' });
        }
    },


    async signup(req, res) {
        try {
            const { username, email, password } = req.body;

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(409).json({ error: 'Username already taken' });
            }

            console.log('Received data from request:', req.body);

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password:', hashedPassword);

            const newUser = new User({ username, email ,password: hashedPassword });
            await newUser.save();

            console.log('New user created:', newUser);

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong when trying to add user!' });
        }
    },

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { name, email, password } = req.body;

            const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong when trying to update the user!' });
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;

            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong when trying to delete the user!' });
        }
    },
};

export default userController;
