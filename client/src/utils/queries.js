import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
      getAllProducts {
        name
        description
        price
        quantity
        category
        createdAt
      }
    }`