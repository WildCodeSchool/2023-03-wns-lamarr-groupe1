import React, { useContext, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import CarouselFile from "./CarouselFile";
import { handleDate } from "../../utils/DateFormat";
import { fileContext } from "../../utils/context/FileContext";
import searchFiles from "../../styles/SearchFiles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import FileActionMenu from "./dropdown/FileActionMenu";
import AddNewInteraction from "./form/FormAddInteraction";
import { useGetProfile } from "../../utils/hook/getProfile";

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
    interactions: Array<{
      type: string;
      user: { username: string };
    }>;
  }>;

  title: string;
  refetch: () => void;
};

const GridFile = ({ title, filesCarousel, refetch }: GridFileProps) => {
  const { setFileId } = useContext(fileContext);
  const profile = useGetProfile();
  const [isActionOpen, setIsActionOpen] = useState<number | null>(null);

  const HandleToggleAction = (id: number) => {
    if (isActionOpen === id) {
      setIsActionOpen(null);
      return;
    }
    setIsActionOpen(id);
    setFileId(id);
  };

  const FileItem = ({ file }) => {
    return (
      <View style={searchFiles.card}>
        <View style={searchFiles.actionContainer}>
          <TouchableOpacity onPress={() => HandleToggleAction(file.id)}>
            <FontAwesomeIcon icon={faEllipsis} size={28} />
          </TouchableOpacity>
          {isActionOpen === file.id ? (
            <FileActionMenu isFocused={false} />
          ) : null}
        </View>
        <View>
          <CarouselFile
            filename={file.filename}
            content={file.content}
            createdAt={handleDate(file.createdAt)}
            isPublic={file.isPublic}
            language={file.language.name}
          />
        </View>
        <View>
          <AddNewInteraction
            id={file.id}
            interactions={file.interactions}
            refetch={refetch}
            username={profile?.username}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={searchFiles.cardList}>
      <View style={styles.containerTitle}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <FlatList
        data={filesCarousel}
        renderItem={({ item }) => <FileItem file={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
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
});

export default GridFile;
