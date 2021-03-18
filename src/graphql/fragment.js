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
    labels
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
          collection{
            id
          }
          photo{
            id
          }
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

export default PHOTO_DETAILS;
