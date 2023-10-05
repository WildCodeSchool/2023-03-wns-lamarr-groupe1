import React, { useEffect, useState } from "react";
import Layout from "components/common/layouts/Layout";
import GridFile from "components/common/GridFile";
import "styles/FilePage.scss";
import { useContext } from "react";
import { fileContext } from "utils/context/FileContext";
import FormNewFile from "components/common/form/FormAddFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "styles/AddFileForm.scss";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_FILES_QUERY } from "graphql/queries/GET_FILES_QUERY";
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
  const { isShow, handleOpenModal, handleCloseModal } = useContext(fileContext);
  const { refetch: refetchPublic, data: publicFilesData } = useQuery(
    GET_FILES_QUERY,
    {
      variables: { filter: { isPublic: false } },
    }
  );
  const { refetch: refetchPrivate, data: privateFilesData } = useQuery(
    GET_FILES_QUERY,
    {
      variables: { filter: { isPublic: true } },
    }
  );

  useEffect(() => {
    refetchPrivate();
    refetchPublic();
  }, []);
  return (
    <Layout>
      <div className="container-file-page">
        <div className="container-creation-head">
          <h2>Mes créations</h2>
          <button onClick={handleOpenModal}>
            Fichier <FontAwesomeIcon className="icon" icon={faPlus} size="sm" />
          </button>
        </div>

        <GridFile
          filesCarousel={privateFilesData?.getFiles || []}
          title="Privés"
        />
        <GridFile
          filesCarousel={publicFilesData?.getFiles || []}
          title="Publics"
        />
      </div>
      {isShow ? (
        <>
          <div
            id="fileModal"
            className="modalShow"
            onClick={handleCloseModal}
          ></div>
          <div className="modal">
            <div className="modalBody">
              <FormNewFile />
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default FilePage;
