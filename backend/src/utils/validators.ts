import {body, param, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {Types} from "mongoose";

const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

export const validatePost = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({min: 3})
        .withMessage("Title must be at least 3 characters long."),
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required.")
        .isLength({min: 5})
        .withMessage("Content must be at least 5 characters long."),
    handleValidationErrors,
];

export const validateReply = [
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Reply content is required.")
        .isLength({min: 1})
        .withMessage("Reply must be at least 1 character long."),
    handleValidationErrors,
];

export const validateMongoId = [
    param("id").custom((value) => {
        if (!Types.ObjectId.isValid(value)) {
            throw new Error("Invalid ID");
        }
        return true;
    }),
    handleValidationErrors,
];

export const validateUser = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .isLength({min: 3})
        .withMessage("Username must be at least 3 characters long."),
    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long."),
    handleValidationErrors,
];
