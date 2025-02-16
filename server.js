const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const gqlSchema = require('./gqlSchema');
const resolver = require('./resolver');

// storing sensitive information
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const SERVER_PORT = 3000;

// MongoDB connection
const mongoURL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Success MongoDB connection');
  } catch (error) {
    console.log(`Unable to connect to DB: ${error.message}`);
  }
};

// Apollo Server definition
const apolloServer = new ApolloServer({
  typeDefs: gqlSchema,
  resolvers: resolver
});

// Wrap startup code in an async function
async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Connect to MongoDB
  await connectDB();

  // Start Express server
  app.listen(SERVER_PORT, () => {
    console.log(`Server running on port http://localhost:${SERVER_PORT}${apolloServer.graphqlPath}`);
  });
}

startServer();
