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
    firstName: String!
    lastName: String!
    email: String!
    profilePicture: String
    # Other user fields...
    orders: [Order]!
    cart: [Product]!
    # Add more fields as needed
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int # Add the quantity field
    createdBy: User # Reference to the user who created the product
    category: String!
    createdAt: String
  }

  type Order {
    id: ID!
    orderNumber: String!
    totalAmount: Float!
    date: String!
    user: User! # Reference to the user who placed the order
    products: [OrderProduct]!
    # Add more fields as needed
  }

  type OrderProduct {
    product: Product! # Reference to the product included in the order
    quantity: Int!
    # Add more fields related to each product in the order if needed
  }

  type AuthPayload {
    token: String
    user: User
  }

  

  type Query {
    # Query to get a list of KPIs (you can add filtering and pagination as needed)
    getKPIs: [KPI]

    # Query to get a single KPI by ID
    getKPIById(id: ID!): KPI

    # Query to get user information (authenticated route)
    getUser: User
    getUsers: [User]!

    # Query to get a list of products (you can add filtering and pagination as needed)
    getAllProducts: [Product]!

    # Query to get a single product by ID
    getProductById(id: ID!): Product

    # Query to get a list of orders (you can add filtering and pagination as needed)
    getOrders: [Order]

    # Query to get a single order by ID
    getOrderById(id: ID!): Order


    getUserOrders(userId: ID!): [Order]!

  }

  type Mutation {
    # Mutation to register a new user (public route)
    register(input: RegistrationInput!): AuthPayload

    # Mutation to log in a user (public route)
    login(email: String!, password: String!): AuthPayload

    # Mutation to create a new product (authenticated route)
    createProduct(name: String!, price: Float!, category: String!): Product

    placeOrder(userId: ID!, products: [OrderProductInput]!, totalAmount: Float!): Order!

    addToCart(userId: ID!, productId: ID!): User!

    addProduct(input: ProductInput!): Product # Mutation for adding a product

    # Add more mutations as needed (e.g., update KPI values)
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
  }

  input RegistrationInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  
  input ProductInput {
    name: String!
    description: String
    price: Float!
    quantity: Int
    category: String # Include the category field
  }
  

`;

module.exports = typeDefs;
