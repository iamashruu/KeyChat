import User from '../models/user.model.js';
import bcryipt from 'bcryptjs';
import { generateToken } from '../lib/utils/jwt.js';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import ENV from '../lib/utils/env.js';
import cloudinary from '../lib/cloudinary.js';

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

            //send welcome email
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error("Failed to send welcome email:", error);
            }
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in Signup Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ message: "Invalid credentials!" });
        const isPasswordCorrect = await bcryipt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials!" });
        
        generateToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in Login Controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (_,res) => {
    res.cookie("jwt","",{ maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        if(!profilePic) return res.status(400).json({ message: "Profile picture is required" });

        const user = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(user,{profilePic: uploadResponse.secure_url},{new: true});

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};