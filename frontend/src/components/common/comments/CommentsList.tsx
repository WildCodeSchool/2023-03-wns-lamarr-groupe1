import { useState } from "react"
import CommentCard from "../comments/CommentCard"
import IssuesCard from "../issues/IssuesCard"
import "styles/components/comment.scss"
import FormAddComment from "./form/FormAddComment"
import FormAddIssue from "../issues/form/FormAddIssue"
import FormAddReport from "../form/FomAddReport"
import { ICommentsProps } from "utils/interface/ICommentProps"
import { IIssuesProps } from "utils/interface/IIssuesProps"
import {
  faMessage,
  faCircleDot,
  faRectangleXmark,
  faFileLines
} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type commentsList = {
  comments: ICommentsProps[]
  issues: IIssuesProps[]
  refecthData: () => void
}
const Comments = (props: commentsList) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [type, setType] = useState<string>("closed")

  const handleModal = (contentType: string) => {
    if (!isShow) {
      setIsShow(true)
      setType(contentType)
    }
    if (isShow) {
      if (contentType === "closed") {
        setIsShow(false)
        setTimeout(() => {
          setType(contentType)
        }, 100)
      } else {
        setType(contentType)
      }
    }
    const commentContainer = document.getElementById("commentContainer")
    setTimeout(() => {
      commentContainer?.scrollTo(0, commentContainer.scrollHeight)
    }, 20)
  }

  return (
    <>
      <div className={isShow ? "button-container" : "button-container-hidden"}>
        {type !== "closed" ? (
          <button
            className={type !== "close" ? "button-close" : ""}
            onClick={() => handleModal("closed")}
          >
            <FontAwesomeIcon icon={faRectangleXmark} size="xl" />
          </button>
        ) : null}
        <button
          className={
            type === "comment"
              ? "button-comment-active"
              : type === "closed"
              ? "button-comment"
              : "button-comment-open"
          }
          onClick={() => handleModal("comment")}
        >
          <FontAwesomeIcon icon={faMessage} size="xl" />
        </button>
        <button
          className={type === "issue" ? "button-issue-active" : "button-issue"}
          onClick={() => handleModal("issue")}
        >
          <FontAwesomeIcon icon={faCircleDot} size="xl" />
        </button>
        <button
          className={
            type === "report" ? "button-report-active" : "button-report"
          }
          onClick={() => handleModal("report")}
        >
          <FontAwesomeIcon icon={faFileLines} size="xl" />
        </button>
        <div
          id="commentContainer"
          className={
            isShow && type !== "report"
              ? "comment-container"
              : "comment-container-hidden"
          }
        >
          {type === "comment"
            ? props.comments.map((comment, index) => (
                <CommentCard
                  index={index}
                  key={comment.id}
                  comment={comment.comment}
                  updatedAt={comment.updatedAt}
                  username={comment.user.username}
                />
              ))
            : type === "issue"
            ? props.issues.map((issue, index) => (
                <IssuesCard
                  index={index}
                  key={issue.id}
                  issue={issue.issue}
                  updatedAt={issue.updatedAt}
                  username={issue.user.username}
                  status={issue.status}
                />
              ))
            : null}
        </div>

        {type === "comment" ? (
          <FormAddComment refecthComments={props.refecthData} />
        ) : type === "issue" ? (
          <FormAddIssue refecthIssues={props.refecthData} />
        ) : type === "report" ? (
          <FormAddReport />
        ) : null}
      </div>
    </>
  )
}

export default Comments
