import { gql } from '@apollo/react-hooks';

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
        id
        width
        description
        likeCount
      }
    }
  }
`;

export const UNLIKE_PHOTO = gql`
  mutation unlikePhoto( $id: ID! ) {
    unlikePhoto( id: $id )
  }
`;
