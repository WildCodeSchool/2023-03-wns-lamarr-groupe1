import React, { useRef, useState, useEffect } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import { RAN_CODE } from 'graphql/mutations/RAN_CODE';
import { GET_FILE_QUERY } from 'graphql/queries/GET_FILE_QUERY';
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';



const CodingPage = () => {
  const [content, setCode] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [runCode, { loading }] = useMutation(RAN_CODE);
  const { id } = useParams()
  let fileId = null
  if(id) {
    fileId = parseInt(id)
  }
  const {data, refetch} = useQuery(GET_FILE_QUERY, {variables: {fileId: fileId}})
  
  
  const fetchFile = async () => {
    await refetch()
    setValue(data?.getFile.content)
  }
  useEffect(() => {
    fetchFile()
  });

  const editorRef = useRef<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  function handleCodeChange(value: string | undefined) {
    setCode(value || '');
  }

  async function handleRunCode() {
    if(id) {
      const runCodeId = parseInt(id)
    try {
      const response = await runCode( {
        variables:{
        content,
        runCodeId,
      }
      });
      setResult(JSON.parse(response.data.runCode).run.output)
    } catch (error: any) {
      setResult(error.toString());
    }
  }
  
  }

  return (
    <>
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue={value ? value : "// Write a code"}
        onMount={handleEditorDidMount}
        onChange={handleCodeChange as OnChange}
      />
      <div>
        <button onClick={handleRunCode} disabled={loading ? true : false}>{loading ? 'Running...' : 'Run'}</button>
        <div ref={resultRef}>Resultat: {result} </div>
      </div>
    </>
  );
};

export default CodingPage;