import { gql } from '@apollo/react-hooks';

export const PHOTO_DETAILS = gql`
  fragment photoDetails on Photo {
    id
    width
    height
    color
    tiny
    small
    large
    downloadPage
    creditWeb
    creditId
    photographer
    description
    labels
    tags
    likes{
      edges{
        node{
          id
          user{
            id
          }
        }
      }
    }
    collections{
      edges{
        node{
          id
          collection{
            id
          }
          photo{
            id
          }
        }
      }
    }
    likeCount
    collectionCount
    downloadCount
  }
`;

export const COLLECTION_DETAILS = gql`
  fragment collectionDetails on Collection {
    id
    title
    description
    photoCount
    cover
  }
`;

export const USER_DETAILS = gql`
  fragment userDetails on User {
    id
    username
    firstName
    lastName
    email
    profileImage
  }
  ${PHOTO_DETAILS}
`;

export default PHOTO_DETAILS;
