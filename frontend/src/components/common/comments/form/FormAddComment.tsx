import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { NEW_COMMENT_MUTATION } from "graphql/mutations/NEW_COMMENT_MUTATION"
import { useMutation } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from "react-router-dom"
import { INewCommentProps } from "utils/interface/INewComment"
import { faMessage } from "@fortawesome/free-regular-svg-icons"

type refetch = {
  refecthComments: () => void
}

const AddNewComment = (refecthComments: refetch) => {
  const [addComment, { loading }] = useMutation(NEW_COMMENT_MUTATION)
  const { id } = useParams()
  const fileId = id ? parseInt(id) : null
  const {
    register,
    handleSubmit,
  } = useForm<INewCommentProps>({ mode: "onBlur" })
  const onSubmit: SubmitHandler<INewCommentProps> = async (data) => {
    if (data.comment) {
      try {
        await addComment({
          variables: {
            input: {
              comment: data.comment,
              fileId
            }
          }
        })
        const textarea = document.getElementById(
          "comment"
        ) as HTMLTextAreaElement
        textarea.value = ""
        refecthComments.refecthComments()
      } catch (error: any) {
        console.log(error)
      }
    }
  }

  return (
    <div className="container-comment-form">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-input">
          <textarea
            id="comment"
            placeholder="Ecrivez votre commentaire ..."
            rows={7}
            {...register("comment")}
          ></textarea>
        </div>
        <div className="button-container-form ">
          <button className="button-form" disabled={loading}>
            <FontAwesomeIcon
              className="message-icon"
              icon={faMessage}
              flip="horizontal"
              size="sm"
            />
            Commenter
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewComment
