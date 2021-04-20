import { useQuery } from '@apollo/client';

import { GET_COLLECTION } from '../graphql/queries';

const useCollection = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_COLLECTION, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.collection.photos.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_COLLECTION,
      variables: {
        after: data.collection.photos.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const updatedPhotos = {
          ...fetchMoreResult.collection.photos,
          edges: [
            ...previousResult.collection.photos.edges,
            ...fetchMoreResult.collection.photos.edges,
          ],
        };
        const nextResult = {
          collection: {
            ...previousResult.collection,
            photos: updatedPhotos,
          },
        };

        return nextResult;
      },
    });
  };

  return {
    collection: data ? data.collection : undefined,
    fetchMore: handleFetchMore,
    refetch,
    loading,
    ...result,
  };
};

export default useCollection;
