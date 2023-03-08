import { useQuery } from '@apollo/client';

import { GET_USERS } from '../graphql/queries';

const useUsers = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.users.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_USERS,
      variables: {
        after: data.users.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          users: {
            ...fetchMoreResult.users,
            edges: [
              ...previousResult.users.edges,
              ...fetchMoreResult.users.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    users: data ? data.users : undefined,
    fetchMore: handleFetchMore,
    hasNextPage: data && data.users.pageInfo.hasNextPage,
    refetch,
    loading,
    ...result,
  };
};

export default useUsers;
