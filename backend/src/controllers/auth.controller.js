import User from '../models/user.model.js';
import bcryipt from 'bcryptjs';
import { generateToken } from '../lib/utils/jwt.js';

export const signup = async (req,res) => {
    const { fullName, email, password } = req.body;
    console.log("Signup request body:", req.body);
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        //check if emails valid : regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({ message: "Email already exists!" });
       
        const salt = await bcryipt.genSalt(10);
        const hashedPassword = await bcryipt.hash(password,salt);

        const newUser = new User({ fullName, email, password: hashedPassword });
        if(newUser){
            const savedUser = await newUser.save();
            generateToken(savedUser._id,res);

            res.status(201).json({
                _id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in Signup Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};