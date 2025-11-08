import {Router} from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    addReply,
    upvotePost,
} from "../controller/post.controller";
import {
    validatePost,
    validateReply,
    validateMongoId,
} from "../utils/validators";
import {protect} from "../middleware/auth.middleware";

const router = Router();

router.route("/").post(protect, validatePost, createPost).get(getAllPosts);

router.route("/:id").get(validateMongoId, getPostById);

router
    .route("/:id/reply")
    .post(protect, validateMongoId, validateReply, addReply);

router.route("/:id/upvote").post(protect, validateMongoId, upvotePost);

export default router;
