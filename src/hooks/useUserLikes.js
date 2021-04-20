import { useQuery } from '@apollo/client';

import { GET_USER_LIKES } from '../graphql/queries';

const useUserLikedPhotos = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_USER_LIKES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.likes.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_USER_LIKES,
      variables: {
        after: data.likes.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          likes: {
            ...fetchMoreResult.likes,
            edges: [
              ...previousResult.likes.edges,
              ...fetchMoreResult.likes.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    likes: data ? data.likes : undefined,
    fetchMore: handleFetchMore,
    hasNextPage: data && data.likes.pageInfo.hasNextPage,
    refetch,
    loading,
    ...result,
  };
};

export default useUserLikedPhotos;
