import { gql } from '@apollo/react-hooks';

const PHOTO_DETAILS = gql`
  fragment photoDetails on Photo {
    id
    width
    height
    tiny
    small
    large
    downloadPage
    creditWeb
    creditId
    photographer
    description
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
    reviews{
      edges{
        node{
          id
          text
        }
      }
    }
    reviewCount
    collections{
      edges{
        node{
          id
        }
      }
    }
    likeCount
    collectionCount
    downloadCount
    reviewCount
    createdAt
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const AUTHORIZE = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
    }
  }
`;

export const CREATE_PHOTO = gql`
  mutation createPhoto(
    $width: Int
    $height: Int
    $tiny: String
    $small: String
    $large: String
    $downloadPage: String
    $creditWeb: String
    $creditId: String
    $photographer: String
    $description: String
    $tags: String
    ) {
    createPhoto(photo: {
      width: $width
      height: $height
      tiny: $tiny
      small: $small
      large: $large
      creditWeb: $creditWeb
      creditId: $creditId
      photographer: $photographer
      downloadPage: $downloadPage
      description: $description
      tags: $tags
    } ) {
      id
      width
      height
      tiny
      small
      large
      creditWeb
      creditId
      photographer
      downloadPage
      description
      tags
      likeCount
      downloadCount
    }
  }
`;

export const LIKE_PHOTO = gql`
  mutation likePhoto( $photoId: ID! ) {
    likePhoto(like: { photoId: $photoId } ) {
      id
      user{
        id
        username
      }
      photo{
        ...photoDetails
      }
    }
  }
  ${PHOTO_DETAILS}
`;

export const UNLIKE_PHOTO = gql`
  mutation unlikePhoto( $id: ID! ) {
    unlikePhoto( id: $id )
  }
`;

export const COLLECT_PHOTO = gql`
  mutation collectPhoto( $photoId: ID!,  $collectionId: ID! ) {
    collectPhoto(collect: { photoId: $photoId, collectionId: $collectionId } ) {
      id
      user{
        id
        username
      }
      collection{
        id
        title
      }
      photo{
        ...photoDetails
      }
    }
  }
  ${PHOTO_DETAILS}
`;

export const UNCOLLECT_PHOTO = gql`
  mutation deleteCollectedPhoto( $id: ID! ) {
    deleteCollectedPhoto( id: $id )
  }
`;

export const CREATE_COLLECTION = gql`
  mutation createCollection(
    $title: String!
    $description: String
    $public: Boolean!
    ) {
    createCollection(collection: {
      title: $title
      description: $description
      public: $public
    } ) {
      id
      user{
        id
        username
      }
      title
      description
      public
      createdAt
      cover
    }
  }
`;

export const CREATE_COLLECTION_AND_COLLECT_PHOTO = gql`
  mutation createCollectionAndCollectPhoto(
    $title: String!
    $description: String
    $public: Boolean!
    $photoId: ID!
    ) {
      createCollectionAndCollectPhoto(collection: {
      title: $title
      description: $description
      public: $public
      photoId: $photoId
    } ) {
      id
      user{
        id
        username
      }
      collection{
        id
        title
      }
      photo{
        ...photoDetails
      }
    }
  }
  ${PHOTO_DETAILS}
`;
