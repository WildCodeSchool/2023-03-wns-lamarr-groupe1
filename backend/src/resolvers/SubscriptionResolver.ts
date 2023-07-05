import { Arg, Mutation, Query } from "type-graphql"
import { SubscriptionModels } from "../models/SubscriptionModels"
import { UpdateSubscriptionInput } from "../inputs/subscription/UpdateSubscriptionInput"
import { calculateEndedAt } from "../services/SubcriptionEndedAt.service"

export class SubscriptionResolver {
  @Mutation(() => SubscriptionModels)
  async updateSubscription(
    @Arg("id") id: number,
    @Arg("update")
    { status, duration }: UpdateSubscriptionInput
  ): Promise<SubscriptionModels> {
    // passe la 1ère lettre ne majuscule
    status = status.charAt(0).toUpperCase() + status.substring(1).toLowerCase()
    duration =
      duration.charAt(0).toUpperCase() + duration.substring(1).toLowerCase()
    
    // définit une nouvelle date de début
    const subscribedAt = new Date()
    
    // récupérer le fichier a update
    const subscriptionToUpdate = await SubscriptionModels.findOneBy({
      id
    })
    if (subscriptionToUpdate === null) {
      throw new Error("subscription not found")
    }

    // calcule la date de fin en fonction de la date de début
    const subscriptionEndedAt = calculateEndedAt(duration, status, subscribedAt)

    // update les la date de fin
    const subscription = await SubscriptionModels.merge(subscriptionToUpdate, {
      subscriptionEndedAt,
      duration,
      status,
      subscribedAt
    }).save()

    return subscription
  }

  // Query pour recuperer un fichier par son id
  @Query(() => SubscriptionModels)
  async getSubscription(
    @Arg("subscriptionId") subscriptionId: number
  ): Promise<SubscriptionModels> {
    const subscription = await SubscriptionModels.findOne({
      where: { id: subscriptionId }
    })
    if (subscription === null) {
      throw new Error("File not found")
    }

    return subscription
  }
}
