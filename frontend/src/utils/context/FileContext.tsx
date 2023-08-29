import { createContext, useState } from "react"
import { GET_LANGUAGES_QUERY } from "graphql/queries/GET_LANGUAGES_QUERY"
import { useQuery } from "@apollo/client"
import { IFileContextProps } from "utils/interface/IFileContext"

// on défini un nouveau context
export const fileContext = createContext<IFileContextProps>({
  Languages: [],
  isShow: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {}
})

interface FileProviderProps {
  children?: React.ReactNode
}
export const FileProvider = ({ children }: FileProviderProps) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  
  const { data, refetch } = useQuery(GET_LANGUAGES_QUERY)

  const Languages = data?.getLanguages || []
  const fetchLanguages = async () => {
    await refetch()
  }

  const handleOpenModal = () => {
    setIsShow(true)
    fetchLanguages()
  }

  const handleCloseModal = () => {
    setIsShow(false)
  }

  return (
    <fileContext.Provider
      value={{
        Languages,
        handleOpenModal,
        handleCloseModal,
        isShow
      }}
    >
      {children}
    </fileContext.Provider>
  )
}
