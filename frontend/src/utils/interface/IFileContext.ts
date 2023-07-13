import { ILanguageProps } from "utils/interface/ILanguage"

export interface IFileContextProps {
  Languages: ILanguageProps[]
  isShow: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
}