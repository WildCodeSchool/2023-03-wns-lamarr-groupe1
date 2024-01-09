import React from "react";
import { View } from "react-native";

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
    <>
    <View style="styles.card-carousel">
      <div className="content-img">
        <img alt="Preview du fichier" />
      </div>
      <div className="content-info">
        <h4>{fileInfo.filename}</h4>
        <p>{fileInfo.createdAt}</p>
        <p className="language">{fileInfo.language}</p>
      </div>
    </View>
    </>
  );
};

export default CarouselFile;
