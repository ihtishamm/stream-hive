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
    createdAt
    description
    videoUrl
    viewsCount
  }
}`