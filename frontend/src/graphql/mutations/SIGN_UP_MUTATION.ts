import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($firstName: String!, $lastName: String!, $userName: String!, $email: String!, $password: String!) {
    signUp($firstName: $firstName, $lastName: $lastName, $userName: $userName, email: $email, password: $password)
  }
`;
