const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();
const SERVER_PORT = 3000;

const gqlschema = buildSchema(`
    type Login {
        eid: Int
        name: String
        email: String
        password: String
        position: String
        department: String       
    }

    type Query {
        login(email: String!, password: String!): Login
  
        getAllEmployees: [Login]
  
        searchEmployeeByID(eid: Int!): Login
  
        searchEmployeeByDnD(
        position: String, 
        department: String): [Login]
    }
    
    type Mutation { 
        signUp(
            email: String!,
            password: String!): Login

        addNewEmployee(
            name: String!,
            email: String!,
            password: String!): Login

        updateEmployee(
            eid: String!,
            name: String!,
            email: String!,
            password: String!): Login

        deleteEmployee(eid: String!): Login
    }
`);

const rootResolver = {
    login: async (args) => {
      return {
        eid: 1,
        name: "John Doe",
        email: args.email,
        password: args.password,
        position: "Developer",
        department: "IT"
      };
    },
  
    getAllEmployees: async () => {
      return [
        {
          eid: 1,
          name: "John Doe",
          email: "vC5pX@example.com",
          password: "password",
          position: "Developer",
          department: "IT"
        },
        {
          eid: 2,
          name: "Jane Doe",
          email: "hL1o3@example.com",
          password: "password",
          position: "Developer",
          department: "IT"
        }
      ];
    },
  
    searchEmployeeByID: async (args) => {
      return {
        eid: 1,
        name: "John Doe",
        email: "vC5pX@example.com",
        password: "password",
        position: "Developer",
        department: "IT"
      };
    },
  
    searchEmployeeByDnD: async (args) => {
      return [
        {
          eid: 1,
          name: "John Doe",
          email: "vC5pX@example.com",
          password: "password",
          position: "Developer",
          department: "IT"
        },
        {
          eid: 2,
          name: "Jane Doe",
          email: "hL1o3@example.com",
          password: "password",
          position: "Developer",
          department: "IT"
        }
      ];
    },
  
    signUp: async (args) => {
      return {
        eid: 1,
        name: "John Doe",
        email: args.email,
        password: args.password,
        position: "Developer",
        department: "IT"
      };
    },
  
    addNewEmployee: async (args) => {
      return {
        eid: 1,
        name: args.name,
        email: args.email,
        password: args.password,
        position: "Developer",
        department: "IT"
      };
    },
  
    updateEmployee: async (args) => {
      return {
        eid: 1,
        name: args.name,
        email: args.email,
        password: args.password,
        position: "Developer",
        department: "IT"
      };
    },
  
    deleteEmployee: async (args) => {
      return {
        eid: 1,
        name: "John Doe",
        email: "vC5pX@example.com",
        password: "password",
        position: "Developer",
        department: "IT"
      };
    }
  };
  
mongoose.connect('mongodb://localhost:27017/employees', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })  


app.use('/graphql', graphqlHTTP({
    schema: gqlschema,
    rootValue: rootResolver,
    graphiql: true
}));
app.listen(SERVER_PORT, () => {
    console.log(`Server running on port http://localhost:${SERVER_PORT}/graphql`);
})