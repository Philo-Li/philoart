import { gql } from '@apollo/react-hooks';
import { USER_DETAILS } from './fragment';

export const AUTHORIZE = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
      user {
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String
    $email: String!
    ) {
    createUser(user: {
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      email:$email
    }) {
      username
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateUserProfile(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String
    $email: String!
    ) {
    updateUserProfile(user: {
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      email:$email
    }) {
      ...userDetails
    }
  }
  ${USER_DETAILS}
`;

export const CREATE_PHOTO = gql`
  mutation createPhoto(
    $width: Int
    $height: Int
    $tiny: String
    $small: String
    $large: String
    $color: String
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
      color: $color
      creditWeb: $creditWeb
      creditId: $creditId
      photographer: $photographer
      downloadPage: $downloadPage
      description: $description
      tags: $tags
    } ) {
      id
    }
  }
`;

export const LIKE_PHOTO = gql`
  mutation likePhoto( $photoId: ID! ) {
    likePhoto( photoId: $photoId ) {
      id
    }
  }
`;

export const UNLIKE_PHOTO = gql`
  mutation unlikePhoto( $photoId: ID! ) {
    unlikePhoto(photoId: $photoId )
  }
`;

export const COLLECT_PHOTO = gql`
  mutation collectPhoto( $photoId: ID!,  $collectionId: ID! ) {
    collectPhoto(collect: { photoId: $photoId, collectionId: $collectionId } ) {
      id
    }
  }
`;

export const UNCOLLECT_PHOTO = gql`
  mutation deleteColletedPhoto( $photoId: ID!,  $collectionId: ID! ){
    deleteCollectedPhoto(uncollect: { photoId: $photoId, collectionId: $collectionId })
  }
`;

export const DELETE_COLLECTION = gql`
  mutation deleteCollection( $id: ID! ) {
    deleteCollection( id: $id )
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
    }
  }
`;

export const EDIT_PHOTO_LABELS = gql`
  mutation editPhoto( $photoId: ID! ){
    editPhoto(edit: { photoId: $photoId }) {
      id
      width
      height
      small
      large
      labels
      tags
      color
      creditWeb
      creditId
      photographer
      downloadPage
      description
      likeCount
      collectionCount
      downloadCount
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser( $id: ID! ) {
    deleteUser( id: $id )
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $currentPassword: String!
    $newPassword: String!
    ) {
      changePassword(user: {
        currentPassword: $currentPassword
        newPassword: $newPassword
      })
    }
`;

export const DOWNLOAD_PHOTO = gql`
  mutation downloadPhoto( $id: ID! ) {
    downloadPhoto( id: $id )
  }
`;

export const CREATE_AND_LIKE_PHOTO = gql`
  mutation createAndLikePhoto(
    $width: Int
    $height: Int
    $tiny: String
    $small: String
    $large: String
    $color: String
    $downloadPage: String
    $creditWeb: String
    $creditId: String
    $photographer: String
    $description: String
    $tags: String
    ) {
    createAndLikePhoto(photo: {
      width: $width
      height: $height
      tiny: $tiny
      small: $small
      large: $large
      color: $color
      creditWeb: $creditWeb
      creditId: $creditId
      photographer: $photographer
      downloadPage: $downloadPage
      description: $description
      tags: $tags
    } ) {
      id
    }
  }
`;

export const UNLIKE_AND_DELETE_PHOTO = gql`
  mutation unlikeAndDeletePhoto( $url: String! ) {
    unlikeAndDeletePhoto( url: $url )
  }
`;

export const DELETE_PHOTO = gql`
  mutation deletePhoto( $id: ID! ) {
    deletePhoto( id: $id )
  }
`;

export const EDIT_COLLECTION = gql`
mutation editCollection( $collectionId: ID!, $newTitle: String!, $newDescription: String! ){
  editCollection(edit: {collectionId: $collectionId, newTitle: $newTitle, newDescription: $newDescription} ) {
    id
  }
}
`;
