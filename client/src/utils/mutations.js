import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($input: RegistrationInput!) {
    register(input: $input) {
      user {
        id
        firstName
        lastName
        email
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email : $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
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
