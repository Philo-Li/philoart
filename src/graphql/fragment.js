import { gql } from '@apollo/react-hooks';

export const PHOTO_DETAILS = gql`
  fragment photoDetails on Photo {
    id
    title
    year
    description
    tags
    srcTiny
    srcSmall
    srcLarge
    srcOriginal
    srcYoutube
    color
    allColors
    license
    type
    status
    allowDownload
    createdAt
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
    description
  }
`;

export default PHOTO_DETAILS;
