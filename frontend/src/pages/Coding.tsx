import React, { useRef, useState, useEffect } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import { RAN_CODE } from "graphql/mutations/RAN_CODE";
import { GET_FILE_QUERY } from "graphql/queries/GET_FILE_QUERY";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SAVE_CODE } from "graphql/mutations/SAVE_CODE";
import Layout from "components/common/layouts/Layout";
import AuthenticatedPage from "utils/hoc/authenticatedPage";
import Comments from "components/common/comments/CommentsList";
import { useGetProfile } from "utils/hook/getProfile";
import AddNewInteraction from "../components/common/form/FormAddInteraction";
import "styles/Coding.scss";

const CodingPage = () => {
	const [code, setCode] = useState<string>("");
	const [result, setResult] = useState<string>("");
	const [runCode, { loading }] = useMutation(RAN_CODE);
	const [saveCode] = useMutation(SAVE_CODE);
	const [comments, setComments] = useState([]);
	const [issues, setIssues] = useState([]);
	const [interactions, setInteractions] = useState([]);
	const { id } = useParams();
	let fileId = null;
	if (id) {
		fileId = parseInt(id);
	}
	const { data, refetch } = useQuery(GET_FILE_QUERY, { variables: { fileId } });
	const profile = useGetProfile();

	const editorRef = useRef<any>(null);
	const resultRef = useRef<HTMLDivElement>(null);
	const [showIframe, setShowIframe] = useState(true);
	const [showConsole, setShowConsole] = useState(true);

	let containerClassName = "";
	if (showIframe && showConsole) {
		containerClassName = "editorIframeConsole";
	} else if (showIframe) {
		containerClassName = "editorIframe";
	} else if (showConsole) {
		containerClassName = "editorConsole";
	} else {
		containerClassName = "onlyEditor";
	}

	useEffect(() => {
		function handleWindowResize() {
			if (editorRef.current) {
				editorRef.current.layout();
			}
		}
		window.addEventListener("resize", handleWindowResize);

		if (data && data.getFile) {
			setCode(data.getFile.content);
			setComments(data.getFile.comments);
			setIssues(data.getFile.issues);
			setInteractions(data.getFile.interactions);
		}
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [data]);

	async function refecthData() {
		await refetch();
		setComments(data.getFile.comments);
		setIssues(data.getFile.issues);
		setInteractions(data.getFile.interactions);
		setTimeout(() => {
			const commentContainer = document.getElementById("commentContainer");
			commentContainer?.scrollTo(0, commentContainer.scrollHeight);
		}, 20);
	}

	function handleEditorDidMount(editor: any, monaco: any) {
		editorRef.current = editor;
	}

	function handleCodeChange(value: string | undefined) {
		setCode(value || "");
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
				const filteredResult = JSON.parse(
					response.data.runCode
				).run.output.replace(/\/piston\/[^ ]* /g, "");
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
		<Layout>
			<div className="mainCodingPage">
				<div className="buttons">
					<div className="leftButton">
						<button onClick={toggleIframe}>Preview</button>
						<button onClick={toggleConsole}>Console</button>
						<AddNewInteraction
							id={data?.getFile.id}
							interactions={interactions}
							refetch={refetch}
							username={profile?.username}
						/>
					</div>
					<div className="rightButton">
						<button onClick={handleSaveCode} disabled={loading ? true : false}>
							{loading ? "Sauvegarde..." : "Sauvegarder"}
						</button>
						<button
							className="execButton"
							onClick={handleRunCode}
							disabled={loading ? true : false}
						>
							{loading ? "Running..." : "Executer"}
						</button>
					</div>
				</div>
				<div className={`general ${containerClassName}`}>
					<div className="editorAndPreview">
						<div className="editor">
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
								theme="vs-dark"
							/>
							<Comments
								comments={comments}
								issues={issues}
								refecthData={refecthData}
								user={profile}
								fileId={fileId}
							/>
						</div>
						{showIframe && (
							<div className="iframe">
								<div className="previewTitle">
									<p>
										<b>Preview</b>
									</p>
								</div>
								<iframe
									srcDoc={
										code
											? `<html><body><script>${code}</script></body></html>`
											: "<html><body></body></html>"
									}
									title="output"
									frameBorder="0"
									style={{ width: "100%" }}
								/>
							</div>
						)}
					</div>
					{showConsole && (
						<div className="console">
							<div className="consoleTitle">
								<p>
									<b>Console</b>
								</p>
							</div>
							<div
								ref={resultRef}
								className="showConsole"
								hidden={!showConsole}
							>
								{result}
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default AuthenticatedPage(CodingPage);
