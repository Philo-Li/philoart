import { gql } from '@apollo/react-hooks';
import { PHOTO_DETAILS, COLLECTION_DETAILS, USER_DETAILS } from './fragment';

export const GET_PHOTOS = gql`
  query getPhotos(
    $orderBy: AllPhotosOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $username: String
    $first: Int
    $after: String
    $checkUserLike: ID
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
          id
          title
          srcTiny
          srcSmall
          srcLarge
          artist
          status
          isLiked(checkUserLike: $checkUserLike)
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
`;

export const GET_PHOTO = gql`
  query getPhoto($id: ID!, $checkUserLike: ID) {
    photo(id: $id) {
      ...photoDetails
      user {
        username
      }
      likeCount
      collectionCount
      downloadCount
      isLiked(checkUserLike: $checkUserLike)
    }
  }
  ${PHOTO_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser {
    authorizedUser {
      ...userDetails
    }
  }
  ${USER_DETAILS}
`;

export const GET_USER_LIKES = gql`
  query getLikes(
    $orderBy: AllLikesOrderBy
    $orderDirection: OrderDirection
    $first: Int
    $after: String
    $userId: String
    $username: String
    $checkUserLike: ID
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
            isLiked(checkUserLike: $checkUserLike)
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

export const GET_COLLECTION = gql`
  query getCollection(
    $id: ID!
    $checkUserLike: ID
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
              isLiked(checkUserLike: $checkUserLike)
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
    $checkPhotoCollect: ID
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
          isCollected(checkPhotoCollect: $checkPhotoCollect)
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
