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

export const ADD_PRODUCT = gql`
mutation AddProduct($input: ProductInput!) {
  addProduct(input: $input) {
    id
    name
    description
    price
    quantity
    category
    createdBy {
      username
    }
    createdAt
  }
}
`;
