import { Authorized, Mutation, Arg } from "type-graphql";
import axios from "axios";
import { FilesModels } from "../models/FilesModels";

export class PistonResolver {
    // @Authorized()
    @Mutation (() => String)

    async runCode(  
        @Arg("id") id: number, 
        @Arg("content") content: string): Promise<string> {
            
        const file = await FilesModels.findOne({
            where: { id }
            })
            if (file === null) {
            throw new Error("File not found")
            }
            
        try {
            const response = await axios.post('http://piston_api:2000/api/v2/execute', {
                language: file.language.name,
                version: file.language.version, // enculé (by Alex1s)
                files: [
                    {
                        name: file.filename,
                        content,
                    }
                ]
        });
        return JSON.stringify(response.data);
    } catch (error: any) {
        console.log("error", error);
        throw new Error('Une erreur s\'est produite');
        }
    }
}
