import { useQuery } from '@apollo/client';

import { GET_USER_COLLECTIONS_PLUS } from '../graphql/queries';

const useCollections = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_USER_COLLECTIONS_PLUS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.collections.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_USER_COLLECTIONS_PLUS,
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
    refetch,
    loading,
    ...result,
  };
};

export default useCollections;
