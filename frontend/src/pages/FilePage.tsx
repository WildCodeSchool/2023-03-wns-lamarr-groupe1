import React from "react";
import Layout from "components/common/layouts/Layout";
import GridFile from "components/common/GridFile";
import "styles/FilePage.scss";
import { useContext } from "react";
import { dataFile } from "utils/dataFile";
import { fileContext } from "utils/context/FileContext";
import FormNewFile from "components/common/form/FormAddFile";
import "styles/AddFileForm.scss";
// src/types/file.ts
// Dedans, on va exporter le type suivant :
type File = {
  id: number;
  filename: string;
  content: string;
  createdAt: string;
  image: string;
  isPublic: boolean;
};

const FilePage = () => {
  const privateFiles: File[] = dataFile.filter((file) => !file.isPublic);
  const publicFiles: File[] = dataFile.filter((file) => file.isPublic);

  const { isShow, handleOpenModal } = useContext(fileContext);

  return (
    <Layout>
      <div className="container-file-page">
        <div className="container-creation-head">
          <h2>Mes créations</h2>
          <button onClick={handleOpenModal}>Fichier+</button>
        </div>

        <GridFile files={privateFiles} title="Privés" />
        <GridFile files={publicFiles} title="Publics" />
      </div>
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
  );
};

export default FilePage;
