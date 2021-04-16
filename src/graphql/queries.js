import { gql } from '@apollo/react-hooks';
import { PHOTO_DETAILS, COLLECTION_DETAILS } from './fragment';

export const GET_PHOTOS = gql`
  query getPhotos(
    $orderBy: AllPhotosOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $username: String
    $first: Int
    $after: String
  ) {
    photos(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      username: $username
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...photoDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
  ${PHOTO_DETAILS}
`;

export const GET_PHOTO = gql`
  query getPhoto($id: ID!) {
    photo(id: $id) {
      ...photoDetails
    }
  }
  ${PHOTO_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser {
    authorizedUser {
      id
      username
      firstName
      lastName
      email
      profileImage
      likes{
        edges{
          node{
            id
            photo{
              ...photoDetails
            }
            createdAt
          }
        }
      }
      collections{
        edges{
          node{
            id
            user{
              id
              username
            }
            reviews{
              edges{
                node{
                  id
                  text
                }
              }
            }
            photos{
              edges{
                node{
                  id
                  photo{
                    ...photoDetails
                  }
                }
              }
            }
            reviewCount
            title
            description
            photoCount
            createdAt
            public
            cover
          }
        }
      }
      likeCount
      collectionCount
    }
  }
  ${PHOTO_DETAILS}
`;

export const GET_USER_LIKES = gql`
  query getLikes(
    $orderBy: AllLikesOrderBy
    $orderDirection: OrderDirection
    $first: Int
    $after: String
    $userId: String
    $username: String
  ) {
    likes(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
      userId: $userId
      username: $username
    ) {
      edges {
        node {
          id
          user{
            id
          }
          photo{
            ...photoDetails
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
  ${PHOTO_DETAILS}
`;

export const GET_COLLECTIONS = gql`
  query getCollections(
    $orderBy: AllCollectionsOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
    $userId: String
    $username: String
  ) {
    collections(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
      userId: $userId
      username: $username
    ) {
      edges {
        node {
          ...collectionDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
  ${COLLECTION_DETAILS}
`;

export const IS_LIKED_PHOTO = gql`
  query isLikedPhoto {
    isLikedPhoto {
      id
    }
  }
`;

export const GET_COLLECTION_PHOTOS = gql`
  query getCollectionPhotos(
    $orderBy: AllColletedPhotosOrderBy
    $orderDirection: OrderDirection
    $id: ID!
    $first: Int
    $after: String
  ) {
    photosInCollection(
      orderBy: $orderBy
      orderDirection: $orderDirection
      id: $id
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          user{
            id
            username
          }
          photo{
            ...photoDetails
          }
          collection{
            ...collectionDetails
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
  ${PHOTO_DETAILS}
  ${COLLECTION_DETAILS}
`;
