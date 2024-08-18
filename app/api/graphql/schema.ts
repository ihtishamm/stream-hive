const schema = `#graphql

 type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(email: String!, name: String, password: String!): User!
    createPost(title: String!, content: String!, authorId: String!): Post!
  }

  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    image: String
    author: User!
    createdAt: String!
  }
`
export default schema;