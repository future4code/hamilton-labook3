import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

postRouter.post("/create", new PostController().createPost);
postRouter.get("/feed", new PostController().getPosts);
postRouter.get("/orderby", new PostController().getPostByType);
postRouter.post("/:postId", new PostController().likePost)
