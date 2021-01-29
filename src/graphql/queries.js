/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/react-hooks';

const PHOTO_DETAILS = gql`
  fragment photoDetails on Photo {
    id
    width
    height
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

const LIKE_DETAILS = gql`
  fragment likeDetails on Like {
    id
    createdAt
    user {
      id
      username
    }
    photo {
      ...photoDetails
    }
  }
  ${PHOTO_DETAILS}
`;

export const GET_PHOTOS = gql`
  query getPhotos(
    $orderBy: AllPhotosOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    photos(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
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

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeLikes: Boolean = false, $first: Int, $after: String) {
    authorizedUser {
      id
      username
      likes (first: $first, after: $after) {
        edges @include(if: $includeLikes) {
          node {
            ...likeDetails
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
  ${LIKE_DETAILS}
`;
