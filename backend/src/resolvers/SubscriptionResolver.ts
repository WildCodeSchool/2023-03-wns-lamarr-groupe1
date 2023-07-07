import { Arg, Mutation, Query } from "type-graphql"
import { SubscriptionModels } from "../models/SubscriptionModels"
import { UpdateSubscriptionInput } from "../inputs/subscription/UpdateSubscriptionInput"
import { calculateEndedAt } from "../services/SubcriptionEndedAt.service"

export class SubscriptionResolver {
  @Mutation(() => SubscriptionModels)
  async updateSubscription(
    @Arg("id") id: number,
    @Arg("update")
    { type }: UpdateSubscriptionInput
  ): Promise<SubscriptionModels> {
    // passe la 1ère lettre ne majuscule
    type = type.charAt(0).toUpperCase() + type.substring(1).toLowerCase()
    let status = ""
    let duration = ""

    let subscription: SubscriptionModels

    // définit une nouvelle date de début
    const subscribedAt = new Date()

    // récupérer la soucription a update
    const subscriptionToUpdate = await SubscriptionModels.findOneBy({
      id
    })
    if (subscriptionToUpdate === null) {
      throw new Error("subscription not found")
    }

    // calcule la date de fin en fonction de la date de début
    if (type === "Expert" && subscriptionToUpdate.status === "Inactive") {
      status = "Active"
      duration = "Monthly"
      const subscriptionEndedAt = calculateEndedAt(
        duration,
        status,
        subscribedAt
      )
      subscription = await SubscriptionModels.merge(subscriptionToUpdate, {
        subscriptionEndedAt,
        duration,
        status,
        subscribedAt,
        type
      }).save()
    } else if (type === "Free" && subscriptionToUpdate.status === "Active") {
      status = "Active"
      duration = "Monthly"
      subscription = await SubscriptionModels.merge(subscriptionToUpdate, {
        duration,
        status,
        subscribedAt,
        type
      }).save()
    } else {
      status = "Inactive"
      duration = ""
      subscription = await SubscriptionModels.merge(subscriptionToUpdate, {
        duration,
        status,
        subscribedAt,
        type
      }).save()
    }

    // update les la date de fin

    return subscription
  }

  // Query pour recuperer un fichier par son id
  @Query(() => SubscriptionModels)
  async getSubscription(
    @Arg("subscriptionId") subscriptionId: number
  ): Promise<SubscriptionModels> {
    const subscription = await SubscriptionModels.findOneBy({
      id: subscriptionId
    })
    if (subscription === null) {
      throw new Error("File not found")
    }

    return subscription
  }
}
