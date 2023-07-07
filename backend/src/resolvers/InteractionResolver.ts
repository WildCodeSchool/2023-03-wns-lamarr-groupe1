import { Arg, Mutation, Authorized, Query } from "type-graphql";
import { InteractionsModels, InteractionType } from "../models/InteractionsModels";
import { InteractionsInput } from "../inputs/interaction/InteractionsInput";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";

export class InteractionsResolver {

  // Mutation pour ajouter/supprimer/updater une interaction
  @Mutation(() => InteractionsModels)
  async interaction(
    @Arg("input") { type, userId, fileId }: InteractionsInput // On déstructure les propriétés de l'objet InteractionsInput
  ): Promise<InteractionsModels> {
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

    // Recherche d'une interaction existante avec le même utilisateur et le même fichier
    const existingInteraction = await InteractionsModels.findOne({
      where: {
        user: { id: userId },
        file: { id: fileId },
      },
    });

    if (existingInteraction) {
      // Si l'interaction existante a le même type, supprimer l'interaction
      if (existingInteraction.type === type) {
        await existingInteraction.remove();
        return existingInteraction;
      }

      // Si l'interaction existante a un type différent, mettre à jour l'interaction avec le nouveau type
      existingInteraction.type = type;
      await existingInteraction.save();

      return existingInteraction;
    }

    // Création d'une nouvelle instance de InteractionsModels avec les données fournies
    const newInteraction = await InteractionsModels.create({
      type,
      user,
      file,
    }).save();

    return newInteraction;
  }

  // Query pour compter le nombre de likes pour un fichier
  @Query(() => Number)
  async getLike(@Arg("fileId") fileId: number): Promise<number> {
    const count = await InteractionsModels.count({
      where: {
        type: "like" as InteractionType,
        file: { id: fileId },
      },
    });
    return count;
  }

    // Query pour compter le nombre de dislikes pour un fichier
    @Query(() => Number)
    async getDislike(@Arg("fileId") fileId: number): Promise<number> {
      const count = await InteractionsModels.count({
        where: {
          type: "dislike" as InteractionType,
          file: { id: fileId },
        },
      });
      return count;
    }
}
