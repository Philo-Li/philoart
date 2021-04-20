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
`;

export default PHOTO_DETAILS;
