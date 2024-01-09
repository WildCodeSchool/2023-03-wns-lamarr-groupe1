import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AuthenticatedPage from "../utils/hoc/authenticatedPage";
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

  const { privateFiles } = useGetPrivateFiles();
  const { publicFiles } = useGetPublicFiles();

  const { isAuthenticated, setIsAuth } = useContext(authContext);

  const disconnect = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuth(false);
    //@ts-ignore
    navigation.navigate("Sign-in");
  };

  return isAuthenticated ? (
    <>
      <Text>Hello world </Text>
      <GridFile filesCarousel={privateFiles} title="Privés" />
      <GridFile filesCarousel={publicFiles} title="Publics" />
      <Button title="Déconnexion" onPress={disconnect} />
    </>
  ) : (
    <>
      <Text>Not authenticated</Text>
    </>
  );
};

export default FileScreen;
