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