import axios from "axios"; 
import { LanguageModels } from "../models/LanguageModels";

const addLanguages = async (datas: any) => {
    for (const data of datas) {
      const language = await LanguageModels.findOne({
        where: { name: data.language }
        })
        if (language === null) {
          await LanguageModels.create({
            name: data.language,
            version: data.version
          }).save()
        }
    }
  }

const checkPackages = async (datas: any) => {
  for (const item of packages) {
    for (const data of datas) {
      if(data.runtime && data.runtime !== item.language || !data) {
        addPackages(item)
        console.log(`Package ${item.language} installé.`)
      } else {
        console.log("Rien à installé.")
      }
    }
  }
}  

const packages = [
  {
    "language": "node",
    "version": "18.15.0"
  }
]

export const getRuntimes = async () => {
  const response = await axios.get('http://piston_api:2000/api/v2/runtimes')
  checkPackages(response.data)
  addLanguages(response.data)
    try {
    } catch (error: any) {
      console.log("error", error);
    }
  }

  const addPackages = async (item: any) => {
    try {
      await axios.post('http://piston_api:2000/api/v2/packages', item);
    } catch (error: any) {
      console.log("error", error);
    }
  }