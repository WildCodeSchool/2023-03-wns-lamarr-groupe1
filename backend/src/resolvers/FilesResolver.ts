import { Arg, Mutation, Authorized, Query } from "type-graphql";
import { FilesModels } from "../models/FilesModels";
import { FileInput } from "../inputs/FileInput";
import { UsersModels } from "../models/UsersModels";
import { LanguageModels } from "../models/LanguageModels";

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
      id: userId,
    });
    if (user === null) {
      throw new Error("User not found");
    }
    // récupérer un langage en BDD pour liée le fichier a celui-ci
    const language = await LanguageModels.findOneBy({
      id: languageId,
    });
    if (language === null) {
      throw new Error("language not found");
    }

    // Insérer un fichier en BDD
    const file = await FilesModels.create({
      filename,
      content,
      isPublic,
      nbOfReport,
      nbOfDownload,
      user,
      language,
    }).save();

    return file;
  }

  // Query to find all files
  @Authorized()
  @Query(() => [FilesModels])
  async getFiles(): Promise<FilesModels[]> {
    const files = await FilesModels.find();
    return files;
  }

  // Query to find one file by id
  @Authorized()
  @Query(() => FilesModels)
  async getFile(@Arg("fileId") fileId: number): Promise<FilesModels> {
    const file = await FilesModels.findOne({
      where: { id: fileId },
    });
    if (file === null) {
      throw new Error("File not found");
    }

    return file;
  }
}
