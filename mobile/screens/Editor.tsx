import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import React, { useRef, useState, useEffect, useContext } from "react";
import { View, Text, Button, ScrollView, TextInput, SafeAreaView } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { RAN_CODE } from "../graphql/mutations/RAN_CODE";
import { SAVE_CODE } from "../graphql/mutations/SAVE_CODE";
//import Layout from "components/common/layouts/Layout";
import { useGetProfile } from "../utils/hook/getProfile";
import { fileContext } from "../utils/context/FileContext";
import { GET_FILE_QUERY } from "../graphql/queries/GET_FILE_QUERY";
import { useFocusEffect } from '@react-navigation/native'
import { Languages } from '@rivascva/react-native-code-editor/lib/typescript/languages';

const Editor = ( {navigation, route}): JSX.Element => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [runCode, { loading }] = useMutation(RAN_CODE);
  const [saveCode] = useMutation(SAVE_CODE);
  const [fileUser, setfileUser] = useState<string>("");
  const { id } = route.params
  const codeEditorRef = useRef<TextInput>(null);
  let fileId: number | null = null;
  if (id) {
    fileId = parseInt(id);
  }
  const { data: fileData, refetch: fileRefetch } = useQuery(GET_FILE_QUERY, {
    variables: { fileId },
  });

  const profile = useGetProfile();

  const webViewRef = useRef<any>(null);
  const resultRef = useRef<TextInput | null>(null);
  const [showWebView, setShowWebView] = useState(true);
  const [showConsole, setShowConsole] = useState(true);

  useFocusEffect(() => {
    
    if (fileData && fileData.getFile) {
      setCode(fileData.getFile.content);
      setLanguage(fileData.getFile.language.name)
      setfileUser(fileData.getFile.user.username);
      console.log(fileData.getFile);
    }
    return () => {
      if (!navigation.isFocused()) {
        setCode("")
        setResult("")
      }
    }
  });

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
console.log(fileId)
  return (
    <View style={{ flexDirection: "column" }}>
      {code ?
        <ScrollView style={result ? {width: '100%', height: '70%', backgroundColor: 'black'} : {width: '100%', height: '90%', backgroundColor: 'black'}}>
          <CodeEditor
        style={{
            fontSize: 20,
            inputLineHeight: 26,
            highlighterLineHeight: 26,
            backgroundColor: 'black',
            
        }}
        language={language ? language as Languages : "javascript"}
        initialValue={code}
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
      showLineNumbers
        ref={codeEditorRef}
        readOnly
          />
        </ScrollView>
          
        : null}
      <View style={{height: "10%", padding: 10, justifyContent: 'center'}}>
      <Button
                title="Exécuter"
                onPress={handleRunCode}
                disabled={loading}
              />
      </View>
      {result ?
        <ScrollView style={{ height: '20%'}}>
      <Text style={{ fontWeight: "bold"}}>Console</Text>
      <Text>{result}</Text>
        </ScrollView>
        : null}
      
      </View>
      


    
);
};

export default Editor;
