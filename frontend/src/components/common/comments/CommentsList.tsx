import { useState } from "react"
import CommentCard from "./CommentCard"
import "styles/components/comment.scss"
import FormAddComment from "./form/FormAddComment"
import { ICommentsProps } from "utils/interface/ICommentProps"
import { faMessage } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type commentsList = {
  comments: ICommentsProps[]
  refecthComments: () => void
}
const Comments = (props: commentsList) => {
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleCommentModal = () => {
    const commentContainer = document.getElementById("commentContainer")
    commentContainer?.scrollTo(0, commentContainer.scrollHeight)
    setIsShow(!isShow)
  }

  return (
    <>
      <div className={isShow ? "button-container" : "button-container-hidden"}>
        <button className="button-comment" onClick={handleCommentModal}>
          <FontAwesomeIcon
            icon={faMessage}
            style={{ color: "#5340a9" }}
            size="xl"
          />
        </button>
        <div
          id="commentContainer"
          className={isShow ? "comment-container" : "comment-container-hidden"}
        >
          {props.comments.map((comment, index) => (
            <CommentCard
              index={index}
              key={comment.id}
              comment={comment.comment}
              updatedAt={comment.updatedAt}
              username={comment.user.username}
            />
          ))}
        </div>
        <div className={isShow ? "comment-form" : "comment-form-hidden"}>
          <FormAddComment refecthComments={props.refecthComments} />
        </div>
      </div>
    </>
  )
}

export default Comments
