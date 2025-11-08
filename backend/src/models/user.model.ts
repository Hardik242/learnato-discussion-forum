import {Schema, model, Document, Types} from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    password?: string;
    createdAt: Date;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, select: false},
    createdAt: {type: Date, default: Date.now},
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    if (!this.password) {
        return false;
    }
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser>("User", UserSchema);

export {User, IUser};
