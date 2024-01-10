import React, { useContext, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import CarouselFile from "./CarouselFile";
import { handleDate } from "../../utils/DateFormat";
import { fileContext } from "../../utils/context/FileContext";
export type GridFileProps = {
  filesCarousel: Array<{
    id: number;
    filename: string;
    content: string;
    createdAt: string;
    isPublic: boolean;
    language: {
      name: string;
    };
  }>;
  title: string;
};

const GridFile = ({ title, filesCarousel }: GridFileProps) => {
  const { setFileId } = useContext(fileContext);

  const [isActionOpen, setIsActionOpen] = useState<number | null>(null);

  const HandleToggleAction = (id: number) => {
    if (isActionOpen === id) {
      setIsActionOpen(null);
      return;
    }
    setIsActionOpen(id);
    setFileId(id);
  };

  return (
    <>
      <View>
        <View style={styles.containerTitle}>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        <View style={styles.containerCarousel}>
          <View>
            {filesCarousel.map((file) => (
              <View style={styles.mainCardCarousel} key={file.id}>
                <CarouselFile
                  filename={file.filename}
                  content={file.content}
                  createdAt={handleDate(file.createdAt)}
                  isPublic={file.isPublic}
                  language={file.language.name}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    backgroundColor: "#5340a9",
    padding: 10,
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerCarousel: {
    padding: 10,
  },
  mainCardCarousel: {
    paddingBottom: 10,
  },
});

export default GridFile;
