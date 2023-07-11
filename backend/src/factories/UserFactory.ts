import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import {UsersModels} from "../models/UsersModels";
import * as argon2 from "argon2"

export const UserFactory = setSeederFactory(UsersModels, async (faker: Faker) => {
  const user = new UsersModels();
  user.email = faker.internet.email();
  const password = faker.internet.password({
    length: 8,
    prefix: '@A'
  });
  user.password = await argon2.hash(password)
  user.username = faker.internet.userName();
  user.firstname = faker.person.firstName()
  user.lastname = faker.person.lastName()
  return user
});