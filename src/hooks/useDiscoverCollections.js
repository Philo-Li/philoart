import { useQuery } from '@apollo/client';

import { GET_DISCOVER_COLLECTIONS } from '../graphql/queries';

const useDiscoverCollections = (variables) => {
  const {
    data, loading, ...result
  } = useQuery(GET_DISCOVER_COLLECTIONS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    collections: data ? data.collections : undefined,
    loading,
    ...result,
  };
};

export default useDiscoverCollections;
