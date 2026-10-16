import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import User ,{IUser} from '../model/User.js';
import TryCatch from './tryCatch.js';

export interface Authenticated extends Request {
    user?: IUser | null;
};

interface AuthTokenPayload extends JwtPayload {
    user?: IUser;
}

export const isAuth = async (req: Authenticated, res: Response, next: NextFunction): Promise<void> => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const token = authHeader.split(' ')[1];
        if(!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthTokenPayload;
        if(!decoded.user) {
            res.status(401).json({ message: 'Unauthorized or invalid token' });
            return;
        }
        req.user = decoded.user;
        next();
    }catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const allowedRoles = ['admin', 'user', 'rider','seller'];
type Role = (typeof allowedRoles)[number];

export const addUserRole = TryCatch(async(req: Authenticated, res: Response, next: NextFunction) => {
    if(!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
        
    }

    const  {role } = req.body as { role: Role };
    if(!allowedRoles.includes(role)) {
        res.status(400).json({ message: 'Invalid role' });
        return;
    }

    if(!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findByIdAndUpdate(req.user._id, { role }, { new: true});
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ user} , process.env.JWT_SECRET as string, { expiresIn: "15d" });
    res.json({user, token, message: 'Role updated successfully' });
    req.user = user;
    next();
})