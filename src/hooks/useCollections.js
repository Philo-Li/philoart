import { useQuery } from '@apollo/client';

import { GET_COLLECTIONS } from '../graphql/queries';

const useCollections = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_COLLECTIONS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.collections.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_COLLECTIONS,
      variables: {
        after: data.collections.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          collections: {
            ...fetchMoreResult.collections,
            edges: [
              ...previousResult.collections.edges,
              ...fetchMoreResult.collections.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    collections: data ? data.collections : undefined,
    fetchMore: handleFetchMore,
    hasNextPage: data && data.collections.pageInfo.hasNextPage,
    refetch,
    loading,
    ...result,
  };
};

export default useCollections;
