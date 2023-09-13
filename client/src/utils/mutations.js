import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($input: RegistrationInput!) {
    register(input: $input) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($emailOrUsername: String!, $password: String!) {
    login(emailOrUsername: $emailOrUsername, password: $password) {
      token
      user {
        id
        username
        email
        
      }
    }
  }
`;
