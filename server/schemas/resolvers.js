const { AuthenticationError } = require('apollo-server-express');
const { User, KPI } = require('./models'); // Import your Mongoose models
const { authMiddleware, signToken } = require('./auth'); // Import your custom auth functions

const resolvers = {
  Query: {
    // Resolver for fetching a list of KPIs (authenticated route)
    getKPIs: async (parent, args, context) => {
      // Check if the user is authenticated (based on your custom authMiddleware)
      if (!context.req.user) {
        throw new AuthenticationError('You must be logged in to access KPIs.');
      }

      // Fetch and return KPI data based on your data model
      try {
        const kpis = await KPI.find();
        return kpis;
      } catch (error) {
        throw new Error('Failed to fetch KPIs.');
      }
    },

    // Resolver for user login (public route)
    login: async (parent, args) => {
      const { email, password } = args;

      // Authenticate the user based on your custom logic
      // (e.g., check credentials, compare hashed passwords)
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid credentials.');
      }

      // Use your custom auth function to sign a token for the user
      const token = signToken(user);

      return { token, user };
    },
  },

  Mutation: {
    // Resolver for user registration (public route)
    register: async (parent, args) => {
      const { username, email, password } = args;

      // Check if a user with the provided email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('Email already registered.');
      }

      // Create a new user based on your data model
      const newUser = new User({ username, email, password });

      try {
        // Hash the user's password before saving it
        await newUser.save();
        const token = signToken(newUser);

        return { token, user: newUser };
      } catch (error) {
        throw new Error('Failed to register user.');
      }
    },
  },
};

module.exports = resolvers;
