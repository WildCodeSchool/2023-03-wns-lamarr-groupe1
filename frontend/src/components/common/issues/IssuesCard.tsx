import React from "react"
import "styles/components/cardComment.scss"

interface IIssueData {
  index: number
  id?: number
  issue: string
  updatedAt: string
  username: string
  status: string
}

export const handleDate = (day: any): any => {
  day = new Date(day)
  return day.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

const IssuesCard = (issueInfo: IIssueData) => {
  return (
    <div className="card-comment">
      <div
        className={
          issueInfo.index % 2 === 0 ? "comment-info-even" : "comment-info-odd"
        }
      >
        <div className="comment-header">
          <div>
            <p>
              {issueInfo.username.charAt(0).toUpperCase()}
              {issueInfo.username.substring(1).toLowerCase()}
            </p>
            <p>{handleDate(issueInfo.updatedAt)}</p>
          </div>
          <p className={issueInfo.status}>{issueInfo.status}</p>
        </div>

        <p>{issueInfo.issue}</p>
      </div>
    </div>
  )
}

export default IssuesCard
