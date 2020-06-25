import express from "express";
import { PostController } from "../Controller/PostController";

export const postRouter = express.Router();

postRouter.post("/create", new PostController().createPost);
postRouter.get("/feed", new PostController().getPosts);
postRouter.get("/top", new PostController().getPostByType);
