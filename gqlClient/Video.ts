import { gql } from "urql";

export const UploadVideo = gql`
 mutation Mutation($input: VideoInput!) {
  uploadVideo(input: $input) {
    thumbnailUrl
    publish
    title
    id
    description
    createdAt
    videoUrl
  }
}`

export const AllVideos = gql`
 query Query {
  getallVideos {
    id
    thumbnailUrl
    title
    videoUrl
    description
    publish
    createdAt
    viewsCount
    user {
      image
      id
      name
    }
  }
}`

export const VideoById = gql`query Query($videoId: ID!) {
  getVideo(videoId: $videoId) {
    id
    thumbnailUrl
    title
    user {
      followersCount
      image
      name
      id
      hasFollowed
    }
      hasLiked
    hasDisliked
    dislikeCount
    likeCount
    createdAt
    description
    videoUrl
    viewsCount
  }
}`

export const UserVideos = gql`
 query GetUservideos($userId: ID!) {
  getUservideos(userId: $userId) {
    id
    thumbnailUrl
    title
    videoUrl
    viewsCount
    description
    createdAt
    publish
    user {
      name
      image
      id
    }
  }
}`

export const videoComments = gql`
query Query($videoId: ID!) {
  getVideoComments(videoId: $videoId) {
    id
    message
    createdAt
    user {
      image
      name
      id
    }
  }
}`

export const searchVideo = gql`
query Query($query: String!) {
  searchVideos(query: $query) {
    id
    title
    user {
      name
      id
    }
    viewsCount
    videoUrl
    thumbnailUrl
    createdAt
  }
}
`