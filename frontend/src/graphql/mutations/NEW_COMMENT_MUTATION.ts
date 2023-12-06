import { gql } from "@apollo/client"

export const NEW_COMMENT_MUTATION = gql`
  mutation Mutation($input: CommentsInput!) {
    addComments(input: $input) {
      comment
    }
  }
`
