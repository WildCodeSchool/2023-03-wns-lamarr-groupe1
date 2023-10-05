import React from "react";
import ImageCode from "assets/img/our_project.png";
interface IFileData {
  id?: number;
  filename: string;
  content?: string;
  createdAt: string;
  image?: string;
  isPublic: boolean;
  language: string;
}
const CarouselFile = (fileInfo: IFileData) => {
  return (
    <div className="card-carousel">
      <div className="content-img">
        <img src={ImageCode} alt="Preview du fichier" />
      </div>
      <div className="content-info">
        <h4>{fileInfo.filename}</h4>
        <p>{fileInfo.createdAt}</p>
        <p className="language">{fileInfo.language}</p>
      </div>
    </div>
  );
};

export default CarouselFile;
