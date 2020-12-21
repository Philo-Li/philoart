/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/react-hooks';

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    authorizedUser {
      id
      username
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;
