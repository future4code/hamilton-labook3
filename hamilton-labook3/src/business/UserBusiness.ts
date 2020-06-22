import { UserDatabase } from "../data/UserDatabase";

export class UserBusiness {
  private userDatabase = new UserDatabase();

  public async signUp(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    await this.userDatabase.signUp(id, name, email, password);
  }
}
