import { useQuery } from '@apollo/client';

import { GET_COLLECTION_PHOTOS } from '../graphql/queries';

const useCollectionPhotos = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_COLLECTION_PHOTOS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.photosInCollection.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_COLLECTION_PHOTOS,
      variables: {
        after: data.photosInCollection.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          photosInCollection: {
            ...fetchMoreResult.photosInCollection,
            edges: [
              ...previousResult.photosInCollection.edges,
              ...fetchMoreResult.photosInCollection.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    photosInCollection: data ? data.photosInCollection : undefined,
    fetchMore: handleFetchMore,
    refetch,
    loading,
    ...result,
  };
};

export default useCollectionPhotos;
