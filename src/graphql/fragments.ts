import { gql } from "@apollo/client";

export const PHOTO_DETAILS = gql`
  fragment photoDetails on Photo {
    id
    title
    slug
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
    width
    height
    cameraMake
    cameraModel
    lens
    focalLength
    aperture
    shutterSpeed
    iso
    dateTaken
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
