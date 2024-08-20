const schema = `#graphql

   type User {
   
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    token: String
    }
      
     input singInInput {
    email: String!
    password: String!
  }

   input signUpInput {
    name: String!
    email: String!
    password: String!
  }


 type Query {
    me: User
  }

  type Mutation {
    signIn(input: singInInput!): User
    createUser(input: signUpInput!): User
  }

  
`
export default schema;