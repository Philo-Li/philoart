import { useQuery } from '@apollo/client';

import { GET_PHOTOS } from '../graphql/queries';

const usePhotos = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(GET_PHOTOS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  console.log('here var', variables);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.photos.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log('data.photos.pageInfo.endCursor', data.photos.pageInfo.endCursor);

    fetchMore({
      query: GET_PHOTOS,
      variables: {
        after: data.photos.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          photos: {
            ...fetchMoreResult.photos,
            edges: [
              ...previousResult.photos.edges,
              ...fetchMoreResult.photos.edges,
            ],
          },
        };

        console.log('previousResultt', previousResult);
        console.log('fetchMoreResult', fetchMoreResult);
        console.log('nextResult', nextResult);

        return nextResult;
      },
    });
  };

  return {
    photos: data ? data.photos : undefined,
    fetchMore: handleFetchMore,
    refetch,
    loading,
    ...result,
  };
};

export default usePhotos;
