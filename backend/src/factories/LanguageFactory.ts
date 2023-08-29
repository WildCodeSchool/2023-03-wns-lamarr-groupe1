import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { LanguageModels } from "../models/LanguageModels";

export const LanguageFactory = setSeederFactory(LanguageModels, async (faker: Faker) => {
  const language = new LanguageModels();
  language.name = faker.person.firstName();
  return language
});