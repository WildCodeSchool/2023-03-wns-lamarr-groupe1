import { testDataSource } from "../Utils/testDataSource"
import { callGraphQL } from "../Utils/callGraphQL"
import { config } from "dotenv"
import { SubscriptionModels } from "../models/SubscriptionModels"

config()

describe("SubscriptionResolver", () => {
  beforeAll(async () => {
    await testDataSource.initialize()
  })

  describe("updateSubscription", () => {
    it("should throw error, if subscription is not found", async () => {
      const id = 50
      const type = "free"

      const response = await callGraphQL({
        query: `
            mutation Mutation($update: UpdateSubscriptionInput!, $updateSubscriptionId: Float!) {
              updateSubscription(update: $update, id: $updateSubscriptionId) {
                id
              }
            }
        `,

        variables: { update: { type }, updateSubscriptionId: id }
      })

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("subscription not found")

      expect(response.data).not.toBeTruthy()
    })

    it("should update subscription and return it", async () => {
      const id = 1
      const type = "free"

      await SubscriptionModels.create({
        type: "expert",
        duration: "Monthly",
        status: "Active",
        subscribedAt: new Date(),
        subscriptionEndedAt: new Date()
      }).save()
      const response = await callGraphQL({
        query: `
            mutation Mutation($update: UpdateSubscriptionInput!, $updateSubscriptionId: Float!) {
              updateSubscription(update: $update, id: $updateSubscriptionId) {
                id
              }
            }
        `,

        variables: { update: { type }, updateSubscriptionId: id }
      })

      expect(response.errors).not.toBeTruthy()
      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("updateSubscription")
    })

    it("Should return subscription", async () => {
      const id = 2
      const type = "Expert"
      const duration = "Monthly"
      const status = "Active"
      const subscribedAt = new Date()
      const subscriptionEndedAt = new Date()

      await SubscriptionModels.create({
        type,
        duration,
        status,
        subscribedAt,
        subscriptionEndedAt
      }).save()
      const response = await callGraphQL({
        query: `
            query Query($subscriptionId: Float!) {
              getSubscription(subscriptionId: $subscriptionId) {
                duration
                status
                type
              }
            }
        `,

        variables: { subscriptionId: id }
      })

      expect(response.errors).not.toBeTruthy()
      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("getSubscription")
      expect(response.data?.getSubscription).toHaveProperty("duration")
      expect(response.data?.getSubscription).toHaveProperty("status")
      expect(response.data?.getSubscription).toHaveProperty("type")

      expect(response.data?.getSubscription.type).toBe("Expert")
      expect(response.data?.getSubscription.duration).toBe("Monthly")
      expect(response.data?.getSubscription.status).toBe("Active")
    })

    it("should throw error, if subscription is not found", async () => {
      const id = 3

      const response = await callGraphQL({
        query: `
            query Query($subscriptionId: Float!) {
              getSubscription(subscriptionId: $subscriptionId) {
                duration
                status
                type
              }
            }
        `,

        variables: { subscriptionId: id }
      })

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("subscription not found")

      expect(response.data).not.toBeTruthy()
    })
  })
})
