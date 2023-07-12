
import "../styles/PricingPage.scss";
import Layout from "../components/common/layouts/Layout";
import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';



const CodingPage = () => {

  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

    return (
      <>
        <Layout>
        <Editor
      height="80vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onMount={handleEditorDidMount}
    />
        </Layout>
      </>
    );
  };
  
  export default CodingPage;
  