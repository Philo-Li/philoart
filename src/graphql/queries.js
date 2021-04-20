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
      collections{
        edges{
          node{
            id
            title
            photoCount
            cover
          }
        }
      }
      collectionCount
    }
  }
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

export const GET_COLLECTION = gql`
  query getCollection(
    $id: ID!
    $first: Int
    $after: String
  ) {
    collection(id: $id) {
      ...collectionDetails
      user {
        username
      }
      photos(
        first: $first
        after: $after
      ) {
        edges {
          node {
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
  }
  ${PHOTO_DETAILS}
  ${COLLECTION_DETAILS}
`;

export const GET_DISCOVER_COLLECTIONS = gql`
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

export const GET_USER_COLLECTIONS_PLUS = gql`
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
          photos {
            edges {
              node {
                id
                photo {
                  id
                }
              }
            }
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
  ${COLLECTION_DETAILS}
`;
