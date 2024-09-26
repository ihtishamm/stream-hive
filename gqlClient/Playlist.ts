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
export const singleplaylist = gql`
query Query($playlistId: ID!) {
  getPlaylist(playlistId: $playlistId) {
    title
    id
    videos {
      title
      thumbnailUrl
      id
      user {
        id
        name
      }
      videoUrl
      viewsCount
      createdAt
    }
    description
    createdAt
    FirstvideoThumbnail
    videoCount
    user {
      id
      name
    }
  }
}`