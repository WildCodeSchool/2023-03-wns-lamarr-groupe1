import React, { useContext } from "react"
import Layout from "components/common/layouts/Layout"
import FormNewFile from "components/common/form/FormAddFile"
import "styles/AddFileForm.scss"
import { fileContext } from "utils/context/FileContext"

const UserFilesPage = () => {
  const { isShow, handleOpenModal } = useContext(fileContext)

  return (
    <Layout>
      <button type="button" onClick={handleOpenModal}>
        Add skill
      </button>
      {isShow ? (
        <div id="fileModal" className="modalShow">
          <div className="modal">
            <div className="modalBody">
              <FormNewFile />
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  )
}

export default UserFilesPage
