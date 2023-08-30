import React, { useRef, useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import axios from 'axios';

const CodingPage = () => {
  const [code, setCode] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const editorRef = useRef<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  function handleCodeChange(value: string | undefined) {
    setCode(value || '');
  }


  
  // async function handleRunCode() {
  //   try {
  //     const response = await axios.post('http://localhost:2000', {
  //       language: 'html',
  //       source: code,
  //     });

  //     setResult(response.data.stdout);
  //   } catch (error: any) {
  //     setResult(error.toString());
  //   }
  // }

  return (
    <>
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue="// Write a code"
        onMount={handleEditorDidMount}
        onChange={handleCodeChange as OnChange}
      />
      <div>
        <button>Run</button>
        <div ref={resultRef}>Result: </div>
      </div>
    </>
  );
};

export default CodingPage;