import React from "react"
import "styles/components/cardComment.scss"

interface ICommentData {
  index: number
  id?: number
  comment: string
  updatedAt: string
  username: string
}

export const handleDate = (day: any): any => {
  day = new Date(day);
  return day.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CommentCard = (commentInfo: ICommentData) => {
  return (
    <div className="card-comment">
      <div
        className={
          commentInfo.index % 2 === 0
            ? "comment-info-even"
            : "comment-info-odd"
        }
      >
        <div className="comment-header">
          <p>
            {commentInfo.username.charAt(0).toUpperCase()}
            {commentInfo.username.substring(1).toLowerCase()}
          </p>
          <p>{handleDate(commentInfo.updatedAt)}</p>
        </div>
        <p>{commentInfo.comment}</p>
      </div>
    </div>
  )
}

export default CommentCard
