import { gql } from '@apollo/react-hooks';

export const PHOTO_DETAILS = gql`
  fragment photoDetails on Photo {
    id
    title
    titleZh
    year
    description
    tags
    photoWidth
    photoHeight
    artworkWidth
    artworkHeight
    srcTiny
    srcSmall
    srcLarge
    srcYoutube
    color
    artist
    license
    type
    medium
    status
    relatedPhotos
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
