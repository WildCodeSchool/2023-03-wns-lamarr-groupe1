import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql"
import { UsersModels } from "../models/UsersModels"
import * as argon2 from "argon2"
import { sign } from "jsonwebtoken"
import { SignUpInput } from "../inputs/SignUpInput"
import { SubscriptionModels } from "../models/SubscriptionModels"
import { calculateEndedAt } from "../services/SubcriptionEndedAt.service"

export class AuthResolver {
  // Mutation signUp -> insérer un utilisateur en BDD (à partir d'identifiants)
  //                 -> (retourner le JWT)
  @Mutation(() => String)
  async signUp(
    @Arg("input")
    { firstname, lastname, username, password, email, type }: SignUpInput
  ): Promise<string> {
    const hashedPassword = await argon2.hash(password)
    const subscribedAt = new Date()
    let subscription: SubscriptionModels
    type = `${type.charAt(0).toUpperCase()}${type.substring(1).toLowerCase()}`

    if (type === "Expert") {
      const status = "Active"
      const duration = "Monthly"
      const subscriptionEndedAt = calculateEndedAt(
        duration,
        status,
        subscribedAt
      )
      subscription = await SubscriptionModels.create({
        status,
        duration,
        subscriptionEndedAt,
        subscribedAt,
        type
      }).save()
    } else {
      const status = "Inactive"
      subscription = await SubscriptionModels.create({ status, type }).save()
    }

    // Insérer un utilisateur en BDD
    const createdUser = await UsersModels.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      subscription
    }).save()

    console.log(
      "process.env.ACCESS_TOKEN_SECRET",
      process.env.ACCESS_TOKEN_SECRET
    )
    const token = sign(
      { userId: createdUser.id },
      process.env.ACCESS_TOKEN_SECRET ?? "test-secret"
    )

    return token
  }

  @Query(() => String)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const date = new Date()

    const userFoundByEmail = await UsersModels.findOne({ where: { email } })
    if (userFoundByEmail == null) {
      throw new Error("Invalid credentials")
    }

    if (userFoundByEmail.subscription === null) {
      throw new Error("subscription not found")
    }

    if (
      userFoundByEmail.subscription.status === "Active" &&
      userFoundByEmail.subscription.subscriptionEndedAt <= date &&
      userFoundByEmail.subscription.type === "Free"
    ) {
      const status = "Inactive"
      const duration = ""
      const type = "Free"
      await SubscriptionModels.merge(userFoundByEmail.subscription, {
        duration,
        status,
        subscribedAt: date,
        type
      }).save()
    } else if (
      userFoundByEmail.subscription.status === "Active" &&
      userFoundByEmail.subscription.subscriptionEndedAt <= date &&
      userFoundByEmail.subscription.type === "Expert"
    ) {
      const status = "Active"
      const duration = "Monthly"
      const type = "Expert"
      const subscriptionEndedAt = calculateEndedAt(duration, status, date)
      await SubscriptionModels.merge(userFoundByEmail.subscription, {
        duration,
        status,
        subscribedAt: date,
        type,
        subscriptionEndedAt
      }).save()
    }
    const passwordValid: boolean = await argon2.verify(
      userFoundByEmail.password,
      password
    )
    if (!passwordValid) {
      throw new Error("Invalid credentials")
    }

    const token = sign(
      { userId: userFoundByEmail.id },
      process.env.ACCESS_TOKEN_SECRET ?? "test-secret"
    )

    return token
  }

  @Authorized()
  @Query(() => UsersModels)
  async getProfile(@Ctx() context: any): Promise<UsersModels> {
    console.log("user", context.user)
    return context.user
  }
}
