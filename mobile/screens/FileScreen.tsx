import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useContext } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authContext } from "../utils/context/AuthContext";
import GridFile from "../components/common/GridFile";
import { fileContext } from "../utils/context/FileContext";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_QUERY } from "../graphql/queries/GET_PROFILE_QUERY";
import {
  useGetPrivateFiles,
  useGetPublicFiles,
} from "../utils/hook/getProfile";

const FileScreen = () => {
  const navigation = useNavigation();
  //const { isShow } = useContext(fileContext);

  const { privateFiles, refetchPrivate } = useGetPrivateFiles();
  const { publicFiles, refetchPublic } = useGetPublicFiles();

  const { isAuthenticated, setIsAuth } = useContext(authContext);

  const disconnect = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuth(false);
    //@ts-ignore
    navigation.navigate("Sign-in");
  };

  return isAuthenticated ? (
    <View>
      <GridFile
        filesCarousel={privateFiles}
        title="Privés"
        refetch={refetchPrivate}
      />
      <GridFile
        filesCarousel={publicFiles}
        title="Publics"
        refetch={refetchPublic}
      />
      <Button title="Déconnexion" onPress={disconnect} />
    </View>
  ) : (
    <>
      <Text>Not authenticated</Text>
    </>
  );
};

export default FileScreen;
