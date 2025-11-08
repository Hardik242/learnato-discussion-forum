import {Router} from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
} from "../controller/user.controller";
import {validateUser} from "../utils/validators";
import {protect} from "../middleware/auth.middleware";

const router = Router();

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

export default router;
