import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness: UserBusiness = new UserBusiness();
const userDb: UserDatabase = new UserDatabase();
const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const auth = new Authenticator();

export class UserController {
  async signUp(req: Request, res: Response) {
    try {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      if (!userData.name) {
        throw new Error("Invalid Name");
      }

      if (
        (!userData.email && userData.email.indexOf("@") === -1) ||
        userData.email.indexOf(".com") === -1
      ) {
        throw new Error("Invalid Email");
      }

      if (!userData.password && userData.password.length < 6) {
        throw new Error("Invalid Password");
      }

      const id = idGenerator.generate();
      const password = await hashManager.hash(userData.password);
      const token = auth.generateToken({ id });

      await userBusiness.signUp(id, userData.name, userData.email, password);

      res.status(200).send({
        token,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userData = {
        email: req.body.email,
        password: req.body.password,
      };

      if (
        (!userData.email && userData.email.indexOf("@") === -1) ||
        userData.email.indexOf(".com") === -1
      ) {
        throw new Error("Invalid Input");
      }

      const user = await userDb.getUserByEmail(userData.email);
      const decryptedPassword = await hashManager.compare(
        userData.password,
        user.password
      );

      if (!decryptedPassword) {
        throw new Error("Invalid Input");
      }

      const accessToken = auth.generateToken({ id: user.id });

      res.status(200).send({
        accessToken
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
}
