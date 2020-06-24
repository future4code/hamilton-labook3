import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public async createPost(
    id: string,
    photo: string,
    description: string,
    createdAt: Date,
    type: string,
    createdBy: string
  ) {
    await this.getConnection()
      .insert({
        id,
        photo,
        description,
        createdAt,
        type,
        createdBy,
      })
      .into("LaPosts");
  }

  public async getPosts(id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT LabookUsers.name, LaPosts.createdAt, LaPosts.description, LaPosts.photo
      FROM LaPosts
      JOIN LabookUsers
      ON LaPosts.createdBy = LabookUsers.id
      WHERE LaPosts.createdBy IN (
      SELECT res_friend 
      FROM LaFriends
      WHERE req_friend = "${id}")
      OR LaPosts.createdBy IN (
      SELECT req_friend 
      FROM LaFriends
      WHERE res_friend = "${id}");
    `)

    return result[0]
  }
}
