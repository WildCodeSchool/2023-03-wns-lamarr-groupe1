import { Arg, Mutation, Authorized, Query } from "type-graphql";
import { IssuesModels } from "../models/IssuesModels";
import { IssuesInput } from "../inputs/issues/IssuesInput";
import { UpdateIssuesInput } from "../inputs/issues/UpdateIssuesInput";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";

export class IssuesResolver {
  @Authorized()
  // Mutation pour ajouter un commentaire
  @Mutation(() => IssuesModels)
  async addIssue(
    @Arg("input") { issue, userId, fileId }: IssuesInput // On déstructure les propriétés de l'objet IssuesInput
  ): Promise<IssuesModels> {
    // Recherche de l'utilisateur correspondant à l'ID fourni
    const user = await UsersModels.findOneBy({
      id: userId,
    });
    if (user === null) {
      throw new Error("User not found");
    }

    // Recherche du fichier correspondant à l'ID fourni
    const file = await FilesModels.findOneBy({
      id: fileId,
    });
    if (file === null) {
      throw new Error("File not found");
    }

    // Création d'une instance de IssuesModels avec les données fournies
    const issues = await IssuesModels.create({
      issue,
      user,
      file,
    }).save();

    return issues;
  }

  @Authorized()
  // Mutation pour mettre à jour un commentaire
  @Mutation(() => IssuesModels)
  async updateComments(
    @Arg("id") id: number,
    @Arg("update") { comment }: UpdateIssuesInput // On déstructure la propriété "comment" de l'objet UpdateIssuesInput
  ): Promise<IssuesModels> {
    // Recherche du commentaire à mettre à jour en utilisant l'ID fourni
    const commentToUpdate = await IssuesModels.findOneBy({
      id,
    });

    if (commentToUpdate === null) {
      throw new Error("Comment not found");
    }

    // Fusion des modifications dans l'objet commentToUpdate
    commentToUpdate.comment = comment;

    // Sauvegarde du commentaire mis à jour
    const updatedComments = await commentToUpdate.save();

    return updatedComments;
  }

  // Query pour obtenir tous les commentaires
  @Query(() => [IssuesModels])
  async getComments(): Promise<IssuesModels[]> {
    const comments = await IssuesModels.find();
    return comments;
  }

  // Query pour obtenir un commentaire par ID
  @Query(() => IssuesModels)
  async getCommentsById(@Arg("commentsId") commentsId: number): Promise<IssuesModels> {
    // Recherche du commentaire en utilisant l'ID fourni
    const comments = await IssuesModels.findOne({
      where: { id: commentsId },
    });
    if (comments === null) {
      throw new Error("Comments not found");
    }
    return comments;
  }

  @Authorized()
  // Mutation pour supprimer un commentaire
  @Mutation(() => Boolean)
  async deleteComments(@Arg("CommentsId") CommentsId: number): Promise<boolean> {
    // Recherche du commentaire à supprimer en utilisant l'ID fourni
    const commentsToDelete = await IssuesModels.findOne({
      where: { id: CommentsId },
    });
    if (!commentsToDelete) {
      throw new Error("Comments not found");
    }

    // Suppression du commentaire
    await commentsToDelete.remove();
    return true;
  }
}
