import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db";
import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import {notFound, errorHandler} from "./middleware/error.middleware";

connectDB();

const app = express();

app.use(helmet());

// const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

app.use(
    cors({
        origin: "https://learnato-discussion-forum-red.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Learnato API Running");
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
