import { gql } from "@apollo/client";

export const SIGN_IN_QUERY = gql`
  query SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
