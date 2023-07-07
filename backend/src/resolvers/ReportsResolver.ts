import { Arg, Mutation, Authorized, Query } from "type-graphql";
import { ReportsModels } from "../models/ReportsModels";
import { ReportsInput } from "../inputs/ReportsInput";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";

export class ReportsResolver {

  // Mutation pour ajouter/supprimer/updater une interaction
  @Mutation(() => ReportsModels)
  async reports(
    @Arg("input") { comment, user, file }: ReportsModels // On déstructure les propriétés de l'objet InteractionsInput
  ): Promise<ReportsModels> {
    // Recherche de l'utilisateur correspondant à l'ID fourni
    const user = await UsersModels.findOneBy({ id: userId });
    if (user === null) {
      throw new Error("User not found");
    }

    // Recherche du fichier correspondant à l'ID fourni
    const file = await FilesModels.findOneBy({ id: fileId });
    if (file === null) {
      throw new Error("File not found");
    }

  }
}
