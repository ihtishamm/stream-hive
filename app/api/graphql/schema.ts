const schema = `#graphql
   
  enum EngagementType {
  LIKE
  DISLIKE
  SAVE
  FOLLOW
  VIEW
}

   type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    token: String
    Announcements: [Announcement]!
    Followers: [User]!
    Followings: [User]!
    }

     type Announcement {
        id: ID!
        message:String!
        createdAt: String!
        user: User!
        likeCount: Int!
        dislikeCount: Int!
     }

  type AnnouncementEngagement {
  user: User!
  announcement: Announcement!
  engagementType: EngagementType!
  createdAt: String!
}

    
      type FollowEngagement {
      engagementType: EngagementType!
       createdAt: String!
       follower: User!       
       following: User!         
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
    input FollowInput {   
     followingId: ID!
}

  input AnnouncementEngagementInput {
  announcementId: ID!
}


 type Query {
     me: User
     getAllAnnouncements: [Announcement!]!
     getUserAnnouncements(userid: ID!): [Announcement!]!
     getUserFollowers(userId: ID!): [User!]!
     getUserFollowing(userId: ID!): [User!]!
     
}
  type Mutation {
    signIn(input: signInInput!): User
    createUser(input: signUpInput!): User
    createAnnouncement(input: createAnnouncementInput!): Announcement!
    editAnnouncement(input: editAnnouncementInput!): Announcement!
    deleteAnnouncement(id: ID!): ID!
    followUser(input: FollowInput!): FollowEngagement!
    unfollowUser(input: FollowInput!): ID!
    likeAnnouncement(input: AnnouncementEngagementInput!): AnnouncementEngagement!
    dislikeAnnouncement(input: AnnouncementEngagementInput!): AnnouncementEngagement!
  }

`

export default schema;
