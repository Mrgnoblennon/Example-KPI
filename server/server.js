const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('./config/connection'); // Import your Mongoose connection setup
const typeDefs = require('./schemas/typeDefs'); // Import your GraphQL type definitions
const resolvers = require('./schemas/resolvers'); // Import your GraphQL resolvers
const { authMiddleware } = require('./utils/auth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dwzlmgxqp', 
  api_key: '395955317297778', 
  api_secret: '***************************' 
});

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Call your authMiddleware function to process the request and extract user information
      const user = authMiddleware({ req });
  
      // Return the context object with the user information
      return { user };
    },
  });

async function startServer() {
  // Wait for your Mongoose connection to be established
  await mongoose.connection;

  // Start the Apollo Server
  await server.start();

  // Apply the Apollo Server middleware after the server is started
  server.applyMiddleware({ app });

  // Start your Express app
  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
