import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
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
    <View style={styles.containerTitleCarousel}>
      <View style={styles.containerTitle}>
        <Text>{title}</Text>
      </View>

      <div className="container-carousel">
        {/* <Slider {...settings}> */}
        <View>
          {filesCarousel.map((file) => (
            <div className="main-card-carousel" key={file.id}>
              {/* <div className="action-container">
                <button
                  onClick={() => HandleToggleAction(file.id)}
                  className="action-button"
                >
                  <FontAwesomeIcon icon={faEllipsis} size={32} />
                </button>
                {isActionOpen === file.id ? <FileActionMenu /> : null}
              </div> */}

              <CarouselFile
                filename={file.filename}
                content={file.content}
                createdAt={handleDate(file.createdAt)}
                isPublic={file.isPublic}
                language={file.language.name}
              />
            </div>
          ))}
        </View>
      </div>
    </View>
  );
};

const styles = {
  containerTitleCarousel: {},
  containerTitle: {},
  contentInfo: {},
  language: {},
};

export default GridFile;
