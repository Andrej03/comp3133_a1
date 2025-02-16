const { gql } = require('apollo-server-express');

const gqlSchema = gql `
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
            department: String
        ): [Login]
    }
    
    type Mutation { 
        signUp(
            email: String!,
            password: String!
        ): Login

        addNewEmployee(
            name: String!,
            email: String!,
            password: String!
        ): Login

        updateEmployee(
            eid: Int!,
            name: String!,
            email: String!,
            password: String!
        ): Login

        deleteEmployee(eid: Int!): Login
    }
`

module.exports = gqlSchema