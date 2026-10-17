import mongoose, {Document, Schema} from "mongoose";


export interface IUser extends Document {
    username: string;
    email: string;
    image: string;
    role: string | null;
}


const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    role: { type: String, required: false, default: null },
}, { timestamps: true });

const User = mongoose.model<IUser>("User", userSchema);

export default User;