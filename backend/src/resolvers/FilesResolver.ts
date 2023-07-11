import { Arg, Mutation, Authorized, Query } from "type-graphql";
import { FilesModels } from "../models/FilesModels";
import { FileInput } from "../inputs/file/FileInput";
import { UpdateFileInput } from "../inputs/file/UpdateFileInput";
import { UsersModels } from "../models/UsersModels";
import { LanguageModels } from "../models/LanguageModels";
import { GetFilesQuery } from "../queries/GetFilesQuery";

export class FileResolver {
  // Mutation addFile -> insérer un fichier en BDD
  @Authorized()
  @Mutation(() => FilesModels)
  async addFile(
    @Arg("userId") userId: number,
    @Arg("languageId") languageId: number,
    @Arg("inputFile")
    { filename, content, isPublic, nbOfReport, nbOfDownload }: FileInput
  ): Promise<FilesModels> {
    // récupérer un utilisateur en BDD pour liée le fichier a celui-ci
    const user = await UsersModels.findOneBy({
      id: userId
    })
    if (user === null) {
      throw new Error("User not found")
    }
    // récupérer un langage en BDD pour liée le fichier a celui-ci
    const language = await LanguageModels.findOneBy({
      id: languageId
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

    return file
  }

  @Authorized()
  @Mutation(() => FilesModels)
  async updateFile(
    @Arg("id") id: number,
    @Arg("update")
    { filename, content, isPublic, nbOfReport, nbOfDownload }: UpdateFileInput
  ): Promise<FilesModels> {
    // récupérer le fichier a update
    const fileToUpdate = await FilesModels.findOneBy({
      id
    })
    if (fileToUpdate === null) {
      throw new Error("File not found")
    }

    // update les data envoyer
    const file = await FilesModels.merge(fileToUpdate, {
      filename,
      content,
      isPublic,
      nbOfReport,
      nbOfDownload
    }).save()

    return file
  }

  // Query pour recuperer tous les fichier
  @Authorized()
  @Query(() => [FilesModels])
  async getFiles(
    @Arg("filter") { programmingLanguage, page }: GetFilesQuery
  ): Promise<FilesModels[]> {
    const pagination: number = page !== undefined ? page : 1
    const NUMBER_OF_FILES_PER_PAGE: number = 10
    const take = NUMBER_OF_FILES_PER_PAGE
    const skip = (pagination - 1) * NUMBER_OF_FILES_PER_PAGE

    const where: Record<string, any> = {}

    if (programmingLanguage !== undefined) {
      where.language = { name: programmingLanguage }
    }

    const files = await FilesModels.find({ where, take, skip })

    return files
  }

  // Query pour recuperer un fichier par son id
  @Authorized()
  @Query(() => FilesModels)
  async getFile(@Arg("fileId") fileId: number): Promise<FilesModels> {
    const file = await FilesModels.findOne({
      where: { id: fileId }
    })
    if (file === null) {
      throw new Error("File not found")
    }

    return file
  }
}
