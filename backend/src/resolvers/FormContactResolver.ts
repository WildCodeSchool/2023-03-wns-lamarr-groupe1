import { Arg, Mutation, Authorized, Query, Ctx } from "type-graphql";
import { ContactFormInput } from "../inputs/ContactFormInput";

const Contact = require("../models/ContactForm");

export class FormContactResolver {
  @Mutation(() => String)
  async IContact(
    @Arg("input")
    { name, email, content }: ContactFormInput
  ): Promise<string> {
    // Insérer un formulaire de contact en BDD
    const createdForm = await ContactFormInput.create({
      name,
      email,
      content,
    }).save();

    return createdForm.createdAt;
  }
}
