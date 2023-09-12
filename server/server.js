const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('./config/connection'); // Import your Mongoose connection setup
const typeDefs = require('./schemas/typeDefs'); // Import your GraphQL type definitions
const resolvers = require('./schemas/resolvers'); // Import your GraphQL resolvers
const { authMiddleware } = require('./utils/auth');

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

async function startServer() {
  // Wait for your Mongoose connection to be established
  await mongoose.connection;

  // Start the Apollo Server
  await server.start();

  // Apply the Apollo Server middleware after the server is started
  server.applyMiddleware({ app });

  // Start your Express app
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
