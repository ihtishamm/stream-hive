


const schema = `#graphql
   
  enum EngagementType {
  LIKE
  DISLIKE
  SAVE
  FOLLOW
  VIEW
}

    scalar Upload 
     
   type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    token: String
    description: String
    handle: String
    backgroundImage: String
    image: String
    Announcements: [Announcement]!
    Followers: [User]!
    Followings: [User]!
    Video: [Video]!
    playlists: [Playlist]!
    videosCount: Int!
    followersCount: Int!
    followingCount: Int!
    hasFollowed: Boolean
    }

     type Video{
      id: ID!
      title: String!
      description: String!
      thumbnailUrl: String
      videoUrl: String
      publish: Boolean!
      createdAt: String!
      user: User
      viewsCount: Int!
       likeCount: Int!
      dislikeCount: Int!
       hasLiked: Boolean!
      hasDisliked: Boolean! 
      playlist: Playlist
     }
      type Comment {
        id: ID!
        message: String!
        createdAt: String!
        user: User!
        video: Video!
        }

     type Announcement {
        id: ID!
        message:String!
        createdAt: String!
        user: User!
        likeCount: Int!
        dislikeCount: Int!
         hasLiked: Boolean!
        hasDisliked: Boolean! 
     }
         type Playlist {
        id: ID!
        title: String!
        description: String
        createdAt: String!
        FirstvideoThumbnail: String
        videoCount: Int!
        user: User!
        videos: [Video!]!
      }
         type PlaylistHasVideo {
         id: ID!
         playlist: Playlist!
          video: Video
}

  type AnnouncementEngagement {
  user: User!
  announcement: Announcement
  engagementType: EngagementType
  createdAt: String!
}

    
      type FollowEngagement {
      engagementType: EngagementType
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
   input VideoInput {
    title: String!
    description: String!
    thumbnailFile: Upload
    videoFile: Upload
     publish: Boolean = true
  }
       input CommentInput {
        videoId: ID!
        message: String!
        }

  input CreatePlaylistWithVideoInput {
  title: String!
  description: String
  videoId: ID! 
}

 input AddVideoToPlaylist{
  playlistId: ID!
  videoId: ID!
  }

 type Query {
     me: User
      getUserById(userId: ID!): User!
     getAllAnnouncements: [Announcement!]!
     getUserAnnouncements(userid: ID!): [Announcement!]!
     getUserFollowers(userId: ID!): [User!]!
     getUserFollowing(userId: ID!): [User!]!
     getallVideos: [Video!]!
     getUservideos(userId: ID!): [Video!]!
     getVideo(videoId: ID!): Video!
      getVideoComments(videoId: ID!): [Comment!]!
      getUserPlaylists(userId: ID!): [Playlist!]!
      getPlaylist(playlistId: ID!): Playlist!
      searchVideos(query: String!): [Video!]!
      getRelatedVideos(videoId: ID!): [Video!]!
      getCurrentUserPlaylists: [Playlist!]!
     
}
  type Mutation {
    signIn(input: signInInput!): User
    createUser(input: signUpInput!): User
    createAnnouncement(input: createAnnouncementInput!): Announcement!
    editAnnouncement(input: editAnnouncementInput!): Announcement!
    deleteAnnouncement(id: ID!): ID!
    followUser(input: FollowInput!): FollowEngagement!
    likeAnnouncement(input: AnnouncementEngagementInput!): AnnouncementEngagement!
    dislikeAnnouncement(input: AnnouncementEngagementInput!): AnnouncementEngagement!
    uploadVideo(input: VideoInput!): Video!
     addComment(input: CommentInput!): Comment!
     createPlaylist(input: CreatePlaylistWithVideoInput!): Playlist!
      addVideoToPlaylist(input: AddVideoToPlaylist!): PlaylistHasVideo!
     
  }

`

export default schema;
