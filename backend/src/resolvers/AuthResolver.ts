import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { UsersModels } from "../models/UsersModels";
import * as argon2 from 'argon2'
import { sign } from "jsonwebtoken";
import { SignUpInput } from "../inputs/SignUpInput";

export class AuthResolver {
  // Mutation signUp -> insérer un utilisateur en BDD (à partir d'identifiants)
  //                 -> (retourner le JWT)
  @Mutation(() => String)
  async signUp(
    @Arg("input")
    { firstname, lastname, username, password, email }: SignUpInput
  ): Promise<string> {
    const hashedPassword = await argon2.hash(password);

    // Insérer un utilisateur en BDD
    const createdUser = await UsersModels.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    }).save();

    console.log("process.env.ACCESS_TOKEN_SECRET",process.env.ACCESS_TOKEN_SECRET)
    const token = sign(
      { userId: createdUser.id },
      process.env.ACCESS_TOKEN_SECRET ?? 'test-secret'
    );

    return token;
  }

  @Query(() => String)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const userFoundByEmail = await UsersModels.findOne({ where: { email } });
    if (userFoundByEmail == null) {
      throw new Error("Invalid credentials");
    }

    const passwordValid: boolean = await argon2.verify(
      userFoundByEmail.password,
      password
    );
    if (!passwordValid) {
      throw new Error("Invalid credentials");
    }

    const token = sign(
      { userId: userFoundByEmail.id },
      process.env.ACCESS_TOKEN_SECRET ?? 'test-secret'
    );

    return token;
  }

  @Authorized()
  @Query(() => String)
  async getProfile(@Ctx() context: any): Promise<string> {
    console.log("user", context.user);
    return context.user?.email;
  }
}
