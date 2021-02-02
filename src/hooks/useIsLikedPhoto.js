import { useQuery } from '@apollo/client';

import { IS_LIKED_PHOTO } from '../graphql/queries';

const useIsLikedPhoto = (variables) => {
  const {
    data, fetchMore, refetch, loading, ...result
  } = useQuery(IS_LIKED_PHOTO, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    isLikedPhoto: data ? data.isLikedPhoto : undefined,
    loading,
    ...result,
  };
};

export default useIsLikedPhoto;
