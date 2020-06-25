import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { PostBusiness } from "../business/PostBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

const postBusiness: PostBusiness = new PostBusiness();
const idGenerator = new IdGenerator();
const auth = new Authenticator();

export class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const idData = auth.getData(token);
      const tokenId = idData.id;

      const postData = {
        id: idGenerator.generate(),
        photo: req.body.photo,
        description: req.body.description,
        createdAt: new Date(),
        type: req.body.type,
        createdBy: tokenId,
      };

      await postBusiness.createPost(
        postData.id,
        postData.photo,
        postData.description,
        postData.createdAt,
        postData.type,
        postData.createdBy
      );

      res.status(200).send({
        message: "Post created!",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const idData = auth.getData(token);
      const tokenId = idData.id;

      const posts = await postBusiness.getPosts(tokenId);

      res.status(200).send({
        posts,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async getPostByType(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const id = auth.getData(token).id;
      const postType = req.query.type as string;

      const posts = await postBusiness.getPostByType(id, postType);

      res.status(200).send({
        posts: posts,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
}
