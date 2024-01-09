import React from "react";
import { ScrollView, Text, View } from "react-native";

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
    <ScrollView>
      <View style={styles.cardCarousel}>
        <View style={styles.contentImg}>
          {/* <Image source={} alt="Preview du fichier" /> */}
        </View>
        <View style={styles.contentInfo}>
          <Text>{fileInfo.filename}</Text>
          <Text>{fileInfo.createdAt}</Text>
          <Text style={styles.language}>{fileInfo.language}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  cardCarousel: {},
  contentImg: {},
  contentInfo: {},
  language: {},
};

export default CarouselFile;
