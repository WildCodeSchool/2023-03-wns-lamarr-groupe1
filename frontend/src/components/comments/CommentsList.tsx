import CommentCard from "./CommentCard"
import "styles/components/comment.scss"

export type CommentsProps = {
  comments: Array<{
    id: number
    comment: string
    updatedAt: string
    user: {
      username: string
    }
  }>
}
const Comments = (comments: CommentsProps) => {
  return (
    <>
      <div className="main-comment-container">
        <div className="button-container">
          <button className="button"></button>
          <div className="comment-container">
            {comments.comments.map((comment, index) => (
              <CommentCard
                index={index}
                key={comment.id}
                comment={comment.comment}
                updatedAt={comment.updatedAt}
                username={comment.user.username}
              />
            ))}
          </div>
          <div className="comment-form">
              <p>test</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comments
