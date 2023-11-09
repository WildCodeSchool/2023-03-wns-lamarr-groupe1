import { Arg, Mutation, Authorized, Query } from "type-graphql";
import { IssuesModels } from "../models/IssuesModels";
import { IssuesInput } from "../inputs/issues/IssuesInput";
import { UpdateIssuesInput } from "../inputs/issues/UpdateIssuesInput";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";
import { Equal } from "typeorm";
import { IssuesType } from "../enums/IssuesType";

export class IssuesResolver {
  @Authorized()
  // Mutation pour ajouter une issue
  @Mutation(() => IssuesModels)
  async addIssue(
    @Arg("input") { issue, status, userId, fileId }: IssuesInput // On déstructure les propriétés de l'objet IssuesInput
  ): Promise<IssuesModels> {
    // Recherche de l'utilisateur correspondant à l'ID fourni
    const user = await UsersModels.findOneBy({
      id: userId
    })
    if (user === null) {
      throw new Error("User not found")
    }

    // Recherche du fichier correspondant à l'ID fourni
    const file = await FilesModels.findOneBy({
      id: fileId
    })
    if (file === null) {
      throw new Error("File not found")
    }

    // Création d'une instance de IssuesModels avec les données fournies
    const issues = await IssuesModels.create({
      issue,
      status,
      user,
      file
    }).save()

    return issues
  }

  @Authorized()
  // Mutation pour mettre à jour une issue
  @Mutation(() => IssuesModels)
  async updateIssues(
    @Arg("id") id: number,
    @Arg("update") { issue, status }: UpdateIssuesInput, // On déstructure la propriété "issue" de l'objet UpdateIssuesInput
    @Ctx() context: any
  ): Promise<IssuesModels> {
    // Recherche de l'issue à mettre à jour en utilisant l'ID fourni

    const issueToUpdate = await IssuesModels.findOneBy({
      id
    })

    if (issueToUpdate === null) {
      throw new Error("Comment not found")
    }

    if (issueToUpdate.user.id !== context.user.id) {
      throw new Error("You don't have the rights to modify this file")
    }

    // Fusion des modifications dans l'objet issuesToUpdate
    if (issue !== undefined) {
      issueToUpdate.issue = issue
    }

    if (status !== undefined) {
      issueToUpdate.status = status
    }

    // Sauvegarde de l'issue mis à jour
    const updatedIssue = await issueToUpdate.save()

    return updatedIssue
  }

  // Query pour obtenir toutes les issues
  @Query(() => [IssuesModels])
  async getIssues(): Promise<IssuesModels[]> {
    const issues = await IssuesModels.find()
    return issues
  }

  // Query pour obtenir une issue par ID
  @Query(() => IssuesModels)
  async getIssueById(@Arg("issueId") issueId: number): Promise<IssuesModels> {
    // Recherche du commentaire en utilisant l'ID fourni
    const issue = await IssuesModels.findOne({
      where: { id: issueId }
    })
    if (issue === null) {
      throw new Error("Issue not found")
    }
    return issue
  }

  @Authorized()
  // Query pour obtenir plusieurs issues par leur statut
  @Query(() => [IssuesModels])
  async getIssuesByStatus(
    @Arg("issuesStatus") issuesStatus: string
  ): Promise<IssuesModels[]> {
    // Recherche des issues en utilisant le statut fourni
    const issues = await IssuesModels.find({
      where: { status: Equal(issuesStatus as IssuesType) }
    })
    if (!issues || issues.length === 0) {
      throw new Error("Issues not found")
    }
    return issues
  }

  @Authorized()
  // Mutation pour supprimer une issue
  @Mutation(() => Boolean)
  async deleteIssue(@Arg("issueId") issueId: number): Promise<boolean> {
    // Recherche de l'issue à supprimer en utilisant l'ID fourni
    const issueToDelete = await IssuesModels.findOne({
      where: { id: issueId }
    })
    if (!issueToDelete) {
      throw new Error("Issue not found")
    }

    // Suppression du commentaire
    await issueToDelete.remove()
    return true
  }
}
