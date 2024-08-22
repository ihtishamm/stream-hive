const schema = `#graphql

   type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    token: String
    Announcements: [Announcement]!
    }

     type Announcement {
        id: ID!
        message:String!
        createdAt: String!
        user: User!
     }
      
     input signInInput {
    email: String!
    password: String!
  }

   input signUpInput {
    name: String!
    email: String!
    password: String!
  }

   input createAnnouncementInput {
      message: String!
  }
      
  input editAnnouncementInput {
      id: ID!
    message: String!
  }

 type Query {
    me: User
    getAllAnnouncements: [Announcement!]!
    getUserAnnouncements(userid: ID!): [Announcement!]!
  }

  type Mutation {
    signIn(input: signInInput!): User
    createUser(input: signUpInput!): User
    createAnnouncement(input: createAnnouncementInput!): Announcement!
    editAnnouncement(input: editAnnouncementInput!): Announcement!
    deleteAnnouncement(id: ID!): ID!
  }

`

export default schema;
