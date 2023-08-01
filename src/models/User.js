import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
      type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.findByCredentials = async function (emailOrUsername, password) {
    const User = this;
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

    return user;
};

const User = mongoose.model('User', userSchema);

export default User;
