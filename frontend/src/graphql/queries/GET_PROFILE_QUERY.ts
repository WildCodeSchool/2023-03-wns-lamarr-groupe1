import { gql } from "@apollo/client";

export const GET_PROFILE_QUERY = gql`
  query GetProfile($filter: GetProfileQuery!) {
    getProfile(filter: $filter) {
      username
      email
      files {
        id
        filename
        isPublic
        createdAt
        language {
          name
        }
      }
    }
  }
`;
