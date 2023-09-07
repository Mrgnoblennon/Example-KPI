const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type KPI {
    id: ID!
    name: String!
    value: Float!
    date: String! # You can use a custom scalar for dates if needed
  }

  type User {
    id: ID!
    username: String!
    email: String!
    # Add other user-related fields as needed
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String!
    # Add other product-related fields as needed
  }

  type Order {
    id: ID!
    orderNumber: String!
    totalAmount: Float!
    date: String! # You can use a custom scalar for dates if needed
    # Add other order-related fields as needed
  }

  type Query {
    # Query to get a list of KPIs (you can add filtering and pagination as needed)
    getKPIs: [KPI]

    # Query to get a single KPI by ID
    getKPIById(id: ID!): KPI

    # Query to get user information (authenticated route)
    getUser: User

    # Query to get a list of products (you can add filtering and pagination as needed)
    getProducts: [Product]

    # Query to get a single product by ID
    getProductById(id: ID!): Product

    # Query to get a list of orders (you can add filtering and pagination as needed)
    getOrders: [Order]

    # Query to get a single order by ID
    getOrderById(id: ID!): Order
  }

  type Mutation {
    # Mutation to register a new user (public route)
    register(username: String!, email: String!, password: String!): AuthPayload

    # Mutation to log in a user (public route)
    login(email: String!, password: String!): AuthPayload

    # Mutation to create a new product (authenticated route)
    createProduct(name: String!, price: Float!, category: String!): Product

    # Mutation to create a new order (authenticated route)
    createOrder(orderNumber: String!, totalAmount: Float!): Order

    # Add more mutations as needed (e.g., update KPI values)
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
