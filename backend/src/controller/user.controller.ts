import {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import {User} from "../models/user.model";
import generateToken from "../utils/generateToken";

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const {username, password} = req.body;

        const userExists = await User.findOne({username});
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({
            username,
            password,
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                username: user.username,
                createdAt: user.createdAt,
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await User.findOne({username}).select("+password");

    if (user && (await user.comparePassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            createdAt: user.createdAt,
        });
    } else {
        res.status(401);
        throw new Error("Invalid username or password");
    }
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie("jwt", undefined, {
        httpOnly: true,
        sameSite: "none",
        expires: new Date(0),
    });
    res.status(200).json({message: "User logged out"});
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json(req.user);
});
