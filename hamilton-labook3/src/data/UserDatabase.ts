import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public async signUp(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          password,
        })
        .into("LabookUsers");
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from("LabookUsers")
      .where({ email });

    return result[0];
  }
}
