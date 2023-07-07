import { testDataSource } from "../Utils/testDataSource"
import { callGraphQL } from "../Utils/callGraphQL"
import { config } from "dotenv"
import { faker } from "@faker-js/faker"
import { LanguageModels } from "../models/LanguageModels"
import { FilesModels } from "../models/FilesModels"
import { UsersModels } from "../models/UsersModels"

config()

describe("FilesResolver", () => {
  beforeAll(async () => {
    await testDataSource.initialize()
  })

  describe("addFile", () => {
    it("should throw error, if user is not found", async () => {
      const userId = 5
      const languageId = 1
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]

      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      await LanguageModels.create({
        name: "javascript"
      }).save()

      const token = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($inputFile: FileInput!, $languageId: Float!, $userId: Float!) {
              addFile(inputFile: $inputFile, languageId: $languageId, userId: $userId) {
                filename
              }
            }
        `,

          variables: { inputFile: { filename, isPublic }, languageId, userId }
        },
        token.data?.signUp
      )

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("User not found")

      expect(response.data).not.toBeTruthy()
    })

    it("should throw error, if langage is not found", async () => {
      const userId = 1
      const languageId = 5
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]

      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      const token = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($inputFile: FileInput!, $languageId: Float!, $userId: Float!) {
              addFile(inputFile: $inputFile, languageId: $languageId, userId: $userId) {
                filename
              }
            }
        `,

          variables: { inputFile: { filename, isPublic }, languageId, userId }
        },
        token.data?.signUp
      )

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("language not found")

      expect(response.data).not.toBeTruthy()
    })

    it("should create a new file and return it", async () => {
      const userId = 1
      const languageId = 1
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]

      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      const language = await LanguageModels.create({
        name: "javascript"
      }).save()
      console.log(language)

      const token = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($inputFile: FileInput!, $languageId: Float!, $userId: Float!) {
              addFile(inputFile: $inputFile, languageId: $languageId, userId: $userId) {
                filename
              }
            }
        `,

          variables: { inputFile: { filename, isPublic }, languageId, userId }
        },
        token.data?.signUp
      )

      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("addFile")
      expect(response.data?.addFile).toHaveProperty("filename")
      expect(response.data?.addFile.filename).toContain(filename)

      expect(response.errors).not.toBeTruthy()
    })
  })

  describe("updateFile", () => {
    it("should throw error, if file is not found", async () => {
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]
      const nbOfReport = 0
      const nbOfDownload = 0
      const content = ""
      const updateFileId = 10
      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      const userCreated = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($update: UpdateFileInput!, $updateFileId: Float!) {
              updateFile(update: $update, id: $updateFileId) {
                filename
              }
            }
        `,

          variables: {
            update: { filename, isPublic, nbOfReport, nbOfDownload, content },
            updateFileId
          }
        },
        userCreated.data?.signUp
      )

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("File not found")

      expect(response.data).not.toBeTruthy()
    })

    it("should update an existing file", async () => {
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]
      const nbOfReport = 0
      const nbOfDownload = 0
      const content = ""
      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      const languageCreated = await LanguageModels.create({
        name: "javascript"
      }).save()

      const userCreated = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const user = await UsersModels.findOneBy({
        id: userCreated.data?.id
      })
      if (user === null) {
        throw new Error("User not found")
      }
      // récupérer un langage en BDD pour liée le fichier a celui-ci
      const language = await LanguageModels.findOneBy({
        id: languageCreated.id
      })
      if (language === null) {
        throw new Error("language not found")
      }

      // Insérer un fichier en BDD
      const file = await FilesModels.create({
        filename,
        content,
        isPublic,
        nbOfReport,
        nbOfDownload,
        user,
        language
      }).save()

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($update: UpdateFileInput!, $updateFileId: Float!) {
              updateFile(update: $update, id: $updateFileId) {
                filename
                content
                nbOfDownload
                nbOfReport
                isPublic
              }
            }
        `,

          variables: {
            update: { filename, isPublic, nbOfReport, nbOfDownload, content },
            updateFileId: file.id
          }
        },
        userCreated.data?.signUp
      )
      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("updateFile")

      expect(response.data?.updateFile).toHaveProperty("filename")
      expect(response.data?.updateFile).toHaveProperty("content")
      expect(response.data?.updateFile).toHaveProperty("nbOfDownload")
      expect(response.data?.updateFile).toHaveProperty("nbOfReport")
      expect(response.data?.updateFile).toHaveProperty("isPublic")

      expect(response.data?.updateFile.filename).toContain(filename)
      expect(response.data?.updateFile.content).toContain(content)
      expect(response.data?.updateFile.nbOfDownload).toBe(0)
      expect(response.data?.updateFile.nbOfReport).toBe(0)
      expect(response.data?.updateFile.isPublic).toBe(isPublic)

      expect(response.errors).not.toBeTruthy()
    })
  })
})
