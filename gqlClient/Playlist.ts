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

export const currentUserPlaylist=gql`
query Query {
  getCurrentUserPlaylists {
    id
    title
    createdAt
    description
    FirstvideoThumbnail
    videoCount
    user {
      id
      name
    }
  }
}`

 export const CreateNewPlaylsit = gql`
 mutation Mutation($input: CreatePlaylistWithVideoInput!) {
  createPlaylist(input: $input) {
    title
    id
    description
  }
}`

export const AddVideoToPlaylist = gql`
mutation Mutation($input: AddVideoToPlaylist!) {
  addVideoToPlaylist(input: $input) {
    id
    playlist {
      title
    }
    video {
      id
    }
  }
}`