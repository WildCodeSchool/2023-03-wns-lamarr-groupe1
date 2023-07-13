import React from "react";
import Layout from "../components/common/layouts/Layout";
import GridFile from "../components/common/GridFile";
import "../styles/FilePage.scss";
import { dataFile } from "../utils/dataFile";

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

  return (
    <Layout>
      <div className="container-file-page">
        <div className="container-creation-head">
          <h2>Mes créations</h2>
          <button>Fichier+</button>
        </div>

        <GridFile files={privateFiles} title="Privés" />
        <GridFile files={publicFiles} title="Publics" />
      </div>
    </Layout>
  );
};

export default FilePage;
