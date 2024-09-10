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
    user {
      name
    }
  }
}`