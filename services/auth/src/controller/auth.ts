import type { Request, Response } from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middelware/tryCatch.js";
import type { Authenticated } from "../middelware/isAuth.js";
import { google } from "googleapis";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export const loginUser = TryCatch(async (req: Request, res: Response) => {
    
    try{
        const {code} = req.body;
        if(!code) {
            return res.status(400).json({ message: "Authorization code is required" });
        }

        const googleRes = await oauth2Client.getToken(code);
        auth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const { name, email, picture: image } = userRes.data;
        

        let user = await User.findOne({ email });

        if(!user){
            user = new User({
                username:name,
                email,
                image,
                role:null,
            });
            await user.save();
        }

        const token = jwt.sign({ user} , process.env.JWT_SECRET as string, { expiresIn: "1h" });
        res.status(200).json({ message:"logged successfull",token , user });
    }catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export const myProfile = TryCatch(async (req: Authenticated, res: Response) => {
    try{
        
        const user = req.user;
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        } 
    }catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})