import { UserDatabase } from "../data/UserDatabase";
import { PostDatabase } from "../data/PostDatabase";

export class PostBusiness {
  private postDatabase = new PostDatabase();

  public async createPost(
    id: string,
    photo: string,
    description: string,
    createdAt: Date,
    type: string,
    createdBy: string
  ) {
    await this.postDatabase.createPost(
      id,
      photo,
      description,
      createdAt,
      type,
      createdBy
    );
  }

  public async getPosts(id: string) {
    return await this.postDatabase.getPosts(id);
  }
}
