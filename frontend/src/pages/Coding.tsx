import React, { useRef, useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';

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

  function handleRunCode() {
    try {
      const evalResult = eval(code);
      if (resultRef.current) {
        resultRef.current.innerHTML = evalResult.toString();
      }
    } catch (error: any) {
      if (resultRef.current) {
        resultRef.current.innerHTML = error.toString();
      }
    }
  }

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
        <button onClick={handleRunCode}>Run</button>
        <div ref={resultRef}>Result: </div>
      </div>
    </>
  );
};

export default CodingPage;