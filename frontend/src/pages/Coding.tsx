import React, { useRef, useState, useEffect } from "react"
import Editor, { OnChange } from "@monaco-editor/react"
import { RAN_CODE } from "graphql/mutations/RAN_CODE"
import { GET_FILE_QUERY } from "graphql/queries/GET_FILE_QUERY"
import { useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { SAVE_CODE } from "graphql/mutations/SAVE_CODE"
import AuthenticatedPage from "utils/hoc/authenticatedPage"
import Comments from "../components/comments/CommentsList"
import "styles/Coding.scss"

const CodingPage = () => {
  const [code, setCode] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [runCode, { loading }] = useMutation(RAN_CODE)
  const [saveCode] = useMutation(SAVE_CODE)
  const [comments, setComments] = useState([])
  const { id } = useParams()
  let fileId = null
  if (id) {
    fileId = parseInt(id)
  }
  const { data } = useQuery(GET_FILE_QUERY, { variables: { fileId } })

  useEffect(() => {
    if (!data) return
    setCode(data.getFile.content)
    setComments(data.getFile.comments)
  }, [data])

  const editorRef = useRef<any>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor
  }

  function handleCodeChange(value: string | undefined) {
    setCode(value || "")
  }

  async function handleRunCode() {
    if (id) {
      const runCodeId = parseInt(id)
      try {
        const response = await runCode({
          variables: {
            content: code,
            runCodeId
          }
        })
        setResult(JSON.parse(response.data.runCode).run.output)
      } catch (error: any) {
        console.log("error")
      }
    }
  }

  async function handleSaveCode() {
    if (id) {
      const saveCodeId = parseInt(id)
      const update = {
        content: code
      }
      try {
        await saveCode({
          variables: {
            update: update,
            updateFileId: saveCodeId
          }
        })
      } catch (error: any) {
        console.log(error, error)
      }
    }
  }

  return (
    <>
      <div className="editor-container">
        <Editor
          height="80vh"
          defaultLanguage="javascript"
          defaultValue={code ? code : "// Write a code"}
          onMount={handleEditorDidMount}
          onChange={handleCodeChange as OnChange}
        />
        <Comments comments={comments} />
        <div>
          <button onClick={handleRunCode} disabled={loading ? true : false}>
            {loading ? "Running..." : "Run"}
          </button>
          <button onClick={handleSaveCode} disabled={loading ? true : false}>
            {loading ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>
        <div ref={resultRef}>Resultat: {result} </div>
      </div>
    </>
  )
}

export default AuthenticatedPage(CodingPage)
