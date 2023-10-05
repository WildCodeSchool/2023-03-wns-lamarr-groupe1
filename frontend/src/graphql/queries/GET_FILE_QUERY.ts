import { gql } from "@apollo/client"

export const GET_FILE_QUERY = gql`
query GetFile($fileId: Float!) {
  getFile(fileId: $fileId) {
    content
    filename
    id
    comments {
      comment
      updatedAt
      id
      user {
        username
      }
    }
  }
}`
