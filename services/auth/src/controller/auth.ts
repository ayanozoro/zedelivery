import type { Request, Response } from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middelware/tryCatch.js";

export const loginUser = TryCatch(async (req: Request, res: Response) => {
    try{
        const { email, name,image } = req.body;

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