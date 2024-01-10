import React from "react";
import { ScrollView, Text, View, Image } from "react-native";

interface IFileData {
  id?: number;
  filename: string;
  content?: string;
  createdAt: string;
  image?: string;
  isPublic: boolean;
  language: string;
}

const getImageSource = (language: string) => {
  switch (language.toLowerCase()) {
    case "javascript":
      return require("../../assets/img/javascriptlogo.png");
    case "php":
      return require("../../assets/img/phplogo.png");
    case "typescript":
      return require("../../assets/img/typescript.png");
    default:
      return require("../../assets/img/questionmarklogo.png");
  }
};

const CarouselFile = (fileInfo: IFileData) => {
  const imgSource = getImageSource(fileInfo.language);
  return (
    <View>
      <View style={styles.cardCarousel}>
        <View style={styles.contentImg}>
          <Image
            source={imgSource}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel="Preview du fichier"
          />
        </View>
        <View style={styles.contentInfo}>
          <Text>{fileInfo.filename}</Text>
          <Text>{fileInfo.createdAt}</Text>
          <Text style={styles.language}>{fileInfo.language}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  cardCarousel: {
    borderRadius: 20, // Half of the height for a circular curve
    overflow: "hidden", // This property is important for the curved effect
    borderWidth: 1, // Border size
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  contentImg: {
    flex: 1, // Use flex: 1 to allow the image to take up the available space
  },
  contentInfo: {
    flex: 2, // Adjust the flex value as needed to allocate space for other content
    padding: 15, // Add padding for better separation
    borderTopWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  language: {},
  image: {
    flex: 1,
    backgroundColor: "white",
    width: "100%", // Use width: undefined to allow the image to take up the available width
    height: 150, // Use height: undefined to allow the image to take up the available height
  },
};

export default CarouselFile;
