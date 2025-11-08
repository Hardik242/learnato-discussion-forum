import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import jwt, {JwtPayload} from "jsonwebtoken";
import {User} from "../models/user.model";

export const protect = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token;
        token = req.cookies.jwt;

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500);
            throw new Error("Server configuration error: JWT Secret not set.");
        }

        if (token) {
            try {
                const decoded = jwt.verify(token, secret) as JwtPayload;
                const user = await User.findById(decoded.userId).select(
                    "-password"
                );

                if (!user) {
                    res.status(401);
                    throw new Error("Not authorized, user not found");
                }

                req.user = user;
                next();
            } catch (error) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        } else {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
);
