const { AuthenticationError } = require('apollo-server-express');
const KPI = require('../models/KPI'); // Import your Mongoose models
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authMiddleware, signToken } = require('../utils/auth'); // Import your custom auth functions
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    getUsers: async () => {
        try {
          const users = await User.find();
          return users;
        } catch (error) {
          throw new Error(`Failed to fetch users: ${error.message}`);
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

    getAllProducts: async () => {
        try {
          const products = await Product.find();
          return products;
        } catch (error) {
          throw new Error(`Failed to fetch products: ${error.message}`);
        }
      },

    getUserOrders: async (_, { userId }) => {
        try {
          // Retrieve a user's orders and populate product details
          const orders = await Order.find({ userId }).populate('products.product');
          return orders;
        } catch (error) {
          throw new Error(`Failed to fetch user orders: ${error.message}`);
        }
      },
  },

  Mutation: {
    // Resolver for user registration (public route)
    register: async (_, { input }) => {
      const { username, email, password } = input;

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
        throw new Error('Failed to register user.', error);
      }
    },

    login: async (_, { emailOrUsername, password }) => {
        // Find the user by email or username
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
  
        if (!user) {
          throw new Error('User not found.');
        }
  
        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          throw new Error('Invalid password.');
        }
  
        // Generate an authentication token for the user
        const token = signToken(user);
  
        // Return the user and token
        return {
          user,
          token,
        };
      },

      addProduct: async (_, { input }, context) => {
        // Check if the user is authenticated
        if (!context.user) {
          throw new Error('Authentication required to add a product');
        }
      
        try {
          const newProduct = new Product({
            name: input.name,
            description: input.description,
            price: input.price,
            createdBy: context.user.id, // Use context.user.id to set the createdBy field
            quantity: input.quantity,
          });
      
          // Save the product to the database
          await newProduct.save();
      
          return newProduct;
        } catch (error) {
          throw new Error('Failed to add a product');
        }
      },

    placeOrder: async (_, { userId, products, totalAmount }) => {
        try {
          // Create a new order
          const newOrder = new Order({ userId, products, totalAmount });
          const savedOrder = await newOrder.save();
  
          // Update the user's list of orders
          const user = await User.findByIdAndUpdate(userId, { $push: { orders: savedOrder._id } });
  
          return savedOrder;
        } catch (error) {
          throw new Error(`Failed to place order: ${error.message}`);
        }
      },
      
      addToCart: async (_, { userId, productId }) => {
        try {
          // Add the product to the user's cart
          const user = await User.findByIdAndUpdate(userId, { $push: { cart: productId } });
  
          return user;
        } catch (error) {
          throw new Error(`Failed to add to cart: ${error.message}`);
        }
      },

      addProduct: async (_, { input }, { user }) => {
        // Check if the user is authenticated
        if (!user) {
          throw new Error('Authentication required to add a product');
        }
  
        try {
          const newProduct = new Product({
            name: input.name,
            description: input.description,
            price: input.price,
            createdBy: user.id, // Associate the product with the authenticated user
          });
  
          await newProduct.save();
          return newProduct;
        } catch (error) {
          throw new Error('Failed to add a product');
        }
      },
  },
};

module.exports = resolvers;
