import { gql } from "urql";


export const getAllAnnouncements = gql`
query GetAllAnnouncements {
    getAllAnnouncements {
      id
      dislikeCount
      likeCount
      message
      createdAt
      user {
        name
        id
        email
      }
    }
  }
`


export const userAnnoucements = gql`
 query GetUserAnnouncements($userid: ID!) {
  getUserAnnouncements(userid: $userid) {
    id
    likeCount
    message
    createdAt
    dislikeCount
    user {
      image
      handle
      name
    }
  }
}
`