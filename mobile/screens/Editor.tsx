import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import React, { useRef, useState, useEffect, useContext } from "react";
import { View, Text, Button, ScrollView, TextInput } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { RAN_CODE } from "../graphql/mutations/RAN_CODE";
import { SAVE_CODE } from "../graphql/mutations/SAVE_CODE";
//import Layout from "components/common/layouts/Layout";
import { useGetProfile } from "../utils/hook/getProfile";
import { fileContext } from "../utils/context/FileContext";

const Editor = ( {navigation, route}): JSX.Element => {
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [runCode, { loading }] = useMutation(RAN_CODE);
  const [saveCode] = useMutation(SAVE_CODE);
  const [fileUser, setfileUser] = useState<string>("");
  const { id } = route.params
  const { fileData, setFileId } = useContext(fileContext);
  let fileId: number | null = null;
  if (id) {
    fileId = parseInt(id);
    setFileId(parseInt(id));
  }

  const profile = useGetProfile();

  const webViewRef = useRef<any>(null);
  const resultRef = useRef<TextInput | null>(null);
  const [showWebView, setShowWebView] = useState(true);
  const [showConsole, setShowConsole] = useState(true);

  useEffect(() => {
    if (fileData && fileData.getFile) {
      setCode(fileData.getFile.content);
      setfileUser(fileData.getFile.user.username);
      console.log(fileData.getFile);
    }
  }, [fileData]);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleRunCode = async () => {
    if (fileId) {
      const runCodeId = fileId;
      try {
        const response = await runCode({
          variables: {
            content: code,
            runCodeId,
          },
        });
        const filteredResult = JSON.parse(response.data.runCode).run.output.replace(/\/piston\/[^ ]* /g, "");
        setResult(filteredResult);
        setShowConsole(true);
      } catch (error: any) {
        const filteredError = error.toString().replace(/\/piston\/[^ ]* /g, "");
        setResult(filteredError);
        setShowConsole(true);
      }
    }
  };

  const handleSaveCode = async () => {
    if (fileId) {
      const saveCodeId = fileId;
      const update = {
        content: code,
      };
      try {
        await saveCode({
          variables: {
            update: update,
            updateFileId: saveCodeId,
          },
        });
      } catch (error: any) {
        console.log(error, error);
      }
    }
  };

  const toggleWebView = () => {
    setShowWebView(!showWebView);
  };

  const toggleConsole = () => {
    setShowConsole(!showConsole);
  };

  return (
    <CodeEditor
        style={{
            fontSize: 20,
            inputLineHeight: 26,
            highlighterLineHeight: 26,
        }}
        language="javascript"
        initialValue='test'
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
        showLineNumbers
    />
);
};

export default Editor;
