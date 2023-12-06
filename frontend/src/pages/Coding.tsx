import React, { useRef, useState, useEffect } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import { RAN_CODE } from 'graphql/mutations/RAN_CODE';
import { GET_FILE_QUERY } from 'graphql/queries/GET_FILE_QUERY';
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { SAVE_CODE } from 'graphql/mutations/SAVE_CODE';
import Layout from 'components/common/layouts/Layout';
import "styles/Coding.scss";

const CodingPage = () => {
  const [code, setCode] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [runCode, { loading }] = useMutation(RAN_CODE);
  const [saveCode] = useMutation(SAVE_CODE);
  const { id } = useParams()
  let fileId = null
  if(id) {
    fileId = parseInt(id)
  }
  const { data } = useQuery(GET_FILE_QUERY, {variables: { fileId }})

  const editorRef = useRef<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [showIframe, setShowIframe] = useState(true);
  const [showConsole, setShowConsole] = useState(true);

  let containerClassName = '';
  if (showIframe && showConsole) {
    containerClassName = 'editorIframeConsole';
  } else if (showIframe) {
    containerClassName = 'editorIframe';
  } else if (showConsole) {
    containerClassName = 'editorConsole';
  } else {
    containerClassName = 'onlyEditor';
  }
  
  useEffect(() => {
    function handleWindowResize() {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    }
    window.addEventListener('resize', handleWindowResize);
  
    if (data && data.getFile) {
      setCode(data.getFile.content);
    }
  
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [data]);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  function handleCodeChange(value: string | undefined) {
    setCode(value || '');
  }

  async function handleRunCode() {
    if (id) {
      const runCodeId = parseInt(id);
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
  }

  async function handleSaveCode() {
    if (id) {
      const saveCodeId = parseInt(id);
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
  }

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  const toggleConsole = () => {
    setShowConsole(!showConsole);
  };

  return (
    // <Layout>
    //   <div className="buttons">
    //     <div className="leftButton">
    //       <button onClick={toggleIframe}>Preview</button>
    //       <button onClick={toggleConsole}>Console</button>
    //     </div>
    //     <div className="rightButton">
    //       <button onClick={handleSaveCode} disabled={loading ? true : false}>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</button>
    //       <button className='execButton' onClick={handleRunCode} disabled={loading ? true : false}>{loading ? 'Running...' : 'Executer'}</button>
    //     </div>
    //   </div>
    //   <div className='general'>
    //   <div className='editorAndPreview' style={{ 
    //     height: showConsole ? 'calc(70% - 2px)' : '100%',
    //     borderRadius: showConsole ? '5px, 5px, 0, 0 ' : '5px', }}>
    //       <div className= 'editor' style={{ width: showIframe ? '50%' : '100%' }}>
    //         <Editor
    //           height="100%"
    //           width="100%"
    //           defaultLanguage="javascript"
    //           defaultValue={code ? code : "// Write a code"}
    //           onMount={handleEditorDidMount}
    //           onChange={handleCodeChange as OnChange}
    //           options={{
    //             scrollBeyondLastLine: false,
    //           }}
    //           theme='vs-dark'
    //         />
    //       </div>
    //       {showIframe && (
    //         <div className='iframe'>
    //           <div className='previewTitle'>
    //             <p><b>Preview</b></p>
    //           </div>
    //           <iframe srcDoc={code ? `<html><body><script>${code}</script></body></html>` : '<html><body></body></html>'} title="output" frameBorder='0' style={{ width: '100%', height: '100%' }} />
    //         </div>
    //       )}
    //     </div>
    //     {showConsole && (
    //       <div className='console'>
    //         <div className='consoleTitle'>
    //           <p><b>Console</b></p>
    //         </div>
    //         <div ref={resultRef} className='showConsole' hidden={!showConsole}>
    //           {result}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </Layout>
    <Layout>
    <div className="buttons">
      <div className="leftButton">
        <button onClick={toggleIframe}>Preview</button>
        <button onClick={toggleConsole}>Console</button>
      </div>
      <div className="rightButton">
        <button onClick={handleSaveCode} disabled={loading ? true : false}>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</button>
        <button className='execButton' onClick={handleRunCode} disabled={loading ? true : false}>{loading ? 'Running...' : 'Executer'}</button>
      </div>
    </div>
    <div className={`general ${containerClassName}`}>
      <div className='editorAndPreview'>
        <div className= 'editor'>
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="javascript"
            defaultValue={code ? code : "// Write a code"}
            onMount={handleEditorDidMount}
            onChange={handleCodeChange as OnChange}
            options={{
              scrollBeyondLastLine: false,
            }}
            theme='vs-dark'
          />
        </div>
        {showIframe && (
          <div className='iframe'>
            <div className='previewTitle'>
              <p><b>Preview</b></p>
            </div>
            <iframe srcDoc={code ? `<html><body><script>${code}</script></body></html>` : '<html><body></body></html>'} title="output" frameBorder='0' style={{ width: '100%' }} />
          </div>
        )}
      </div>
      {showConsole && (
        <div className='console'>
          <div className='consoleTitle'>
            <p><b>Console</b></p>
          </div>
          <div ref={resultRef} className='showConsole' hidden={!showConsole}>
            {result}
          </div>
        </div>
      )}
    </div>
  </Layout>
  );
};

export default CodingPage;
