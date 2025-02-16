const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const gqlSchema = require('./gqlSchema');
const resolver = require('./resolver');

// storing sensitive information
const doenv = require('dotenv');
doenv.config();

const app = express();
const SERVER_PORT = 3000;

//MongoDB connection
const mongoURL = process.env.MONGODB_URL;

const connectDB = async() => {
    try{
      mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(_success => {
        console.log('Success Mongodb connection')
      }).catch(_err => {
        console.log('Error Mongodb connection')
      });
    } catch(error) {
        console.log(`Unable to connect to DB : ${error.message}`);
      }
}

// Apollo Server definition
const apolloServer = new ApolloServer({
    typeDefs: gqlSchema,
    resolvers: resolver
})

apolloServer.applyMiddleware({ app });

// APP LISTENER
app.listen(SERVER_PORT, () => {
    console.log(`Server running on port http://localhost:${SERVER_PORT}/graphql`);
    connectDB();
})