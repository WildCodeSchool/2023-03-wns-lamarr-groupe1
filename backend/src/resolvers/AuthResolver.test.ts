import { faker } from "@faker-js/faker";
import { UsersModels } from "../models/UsersModels";
import { testDataSource } from "../Utils/testDataSource";
import { callGraphQL } from "../Utils/callGraphQL";
import { config } from "dotenv";
import * as argon2 from 'argon2'

config();

describe("AuthResolver", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
  });

  describe("signUp", () => {
    it("should throw error, if email is already used", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password({
        length: 8,
        prefix: '@A'
      });      
      const username = faker.internet.userName();

      await UsersModels.create({
        username,
        password,
        email,
      }).save();
      const name = faker.internet.userName();
      const response = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { username: name, email, password } },
      });

      expect(response.errors).toBeTruthy();
      expect(response.errors?.length).toBeGreaterThanOrEqual(1);
      expect(response.errors?.[0]).toHaveProperty("extensions");
      expect(
        response.errors?.[0].extensions?.exception.validationErrors[0].constraints
          .IsUniqueConstraint
      ).toContain("L'email choisi éxiste déjà");

      expect(response.data).not.toBeTruthy();
    });

    it("should throw error, if username is already used", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password({
        length: 8,
        prefix: '@A'
      });      
      const username = faker.internet.userName();

      await UsersModels.create({
        username,
        password,
        email,
      }).save();
      const mail = faker.internet.email();
      const response = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { username, email: mail, password } },
      });

      expect(response.errors).toBeTruthy();
      expect(response.errors?.length).toBeGreaterThanOrEqual(1);
      expect(response.errors?.[0]).toHaveProperty("extensions");
      expect(
        response.errors?.[0].extensions?.exception.validationErrors[0].constraints
          .IsUniqueConstraint
      ).toContain("Le noms d'utilisateur choisi éxiste déjà.");

      expect(response.data).not.toBeTruthy();
    });

    it('should return property "signUp" if a minimum variable are correct', async () => {
      const email = faker.internet.email();
      const password = faker.internet.password({
        length: 8,
        prefix: '@A'
      });
      const username = faker.internet.userName();
      const response = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username } },
      });

      expect(response.errors).not.toBeTruthy();
      expect(response.data).toBeTruthy();
      expect(response.data?.signUp).toBeTruthy();
      // Test a JWT token is returned
      expect(typeof response.data?.signUp).toBe("string");
      expect(response.data?.signUp.length).toBeGreaterThan(10);
      expect(response.data?.signUp.split(".").length).toBe(3);
    });

    it('should return property "signUp" if every variable are correct', async () => {
      const email = faker.internet.email();
      const password = faker.internet.password({
        length: 8,
        prefix: '@A'
      });
      const username = faker.internet.userName();
      const firstname = faker.person.firstName();
      const lastname = faker.person.lastName();
      const response = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, firstname, lastname } },
      });

      expect(response.errors).not.toBeTruthy();
      expect(response.data).toBeTruthy();
      expect(response.data?.signUp).toBeTruthy();
      // Test a JWT token is returned
      expect(typeof response.data?.signUp).toBe("string");
      expect(response.data?.signUp.length).toBeGreaterThan(10);
      expect(response.data?.signUp.split(".").length).toBe(3);
    });
  });

  describe("signIn", () => {
    it("should throw error, if credentials are invalid", async () => {
      const email = faker.internet.email();
      const pass = faker.internet.password({
        length: 8,
        prefix: '@A'
      });
      const password = await argon2.hash(pass);
      const badPassword = faker.internet.password({
        length: 8,
        prefix: '@A'
      }); 
      const username = faker.internet.userName();

      await UsersModels.create({ email, password, username }).save();

      const response = await callGraphQL({
        query: `
        query Query($password: String!, $email: String!) {
          signIn(password: $password, email: $email)
        }
          `,
        variables: { email, password: badPassword },
      });

      expect(response.errors).toBeTruthy();
      expect(response.data).not.toBeTruthy();
    });

    it("should return token, if credentials are valid", async () => {
      const email = faker.internet.email();
      const pass = faker.internet.password({
        length: 8,
        prefix: '@A'
      });
      const password = await argon2.hash(pass);
      const username = faker.internet.userName();

      await UsersModels.create({ email, password, username }).save();

      const response = await callGraphQL({
        query: `
          query Query($password: String!, $email: String!) {
            signIn(password: $password, email: $email)
          }
          `,
        variables: { email, password: pass },
      });
      expect(response.errors).not.toBeTruthy();
      expect(response.data).toBeTruthy();
      expect(response.data?.signIn).toBeTruthy();
      // Test a JWT token is returned
      expect(typeof response.data?.signIn).toBe("string");
      expect(response.data?.signIn.length).toBeGreaterThan(10);
      expect(response.data?.signIn.split(".").length).toBe(3);
    });
  });
});
