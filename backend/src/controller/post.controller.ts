import {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import {IPost, IReply, Post} from "../models/post.model";

export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const {title, content} = req.body;
    const user = req.user;

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const post: IPost = await Post.create({
        title,
        content,
        user: user._id,
        authorUsername: user.username,
    });

    res.status(201).json(post);
});

export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const sortBy = req.query.sort === "votes" ? {votes: -1} : {createdAt: -1};

    const posts: IPost[] = await Post.find()
        // @ts-ignore
        .sort(sortBy)
        .populate("user", "username");

    res.status(200).json(posts);
});

export const getPostById = asyncHandler(async (req: Request, res: Response) => {
    const post: IPost | null = await Post.findById(req.params.id)
        .populate("user", "username")
        .populate("replies.user", "username");

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.status(200).json(post);
});

export const addReply = asyncHandler(async (req: Request, res: Response) => {
    const {content} = req.body;
    const postId = req.params.id;
    const user = req.user;

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const post: IPost | null = await Post.findById(postId);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    const reply = {
        content,
        user: user._id,
        authorUsername: user.username,
        createdAt: new Date(),
    } as IReply;

    post.replies.push(reply);
    await post.save();

    const populatedPost = await Post.findById(post._id)
        .populate("user", "username")
        .populate("replies.user", "username");

    res.status(201).json(populatedPost);
});

export const upvotePost = asyncHandler(async (req: Request, res: Response) => {
    const postId = req.params.id;
    const user = req.user;

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const post: IPost | null = await Post.findById(postId);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    const hasVoted = post.voters.some((voterId) => voterId.equals(user._id));

    if (hasVoted) {
        post.voters = post.voters.filter(
            (voterId) => !voterId.equals(user._id)
        );
    } else {
        post.voters.push(user._id);
    }

    post.votes = post.voters.length;
    const updatedPost = await post.save();

    const populatedPost = await Post.findById(updatedPost._id)
        .populate("user", "username")
        .populate("replies.user", "username");

    res.status(200).json(populatedPost);
});
