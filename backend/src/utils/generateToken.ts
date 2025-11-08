import jwt from "jsonwebtoken";
import {Response} from "express";
import {Types} from "mongoose";

const generateToken = (res: Response, userId: Types.ObjectId) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    // @ts-ignore
    const token = jwt.sign({userId}, secret, {
        expiresIn: expiresIn || "30d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

export default generateToken;
