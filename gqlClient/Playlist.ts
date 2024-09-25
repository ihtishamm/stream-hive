import { gql } from "urql";

export const userplaylists = gql`
query GetUserPlaylists($userId: ID!) {
  getUserPlaylists(userId: $userId) {
    id
    title
    description
    createdAt
    user {
      id
      name
    }
    FirstvideoThumbnail
    videoCount
  }
}
`