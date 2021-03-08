import { useQuery } from '@apollo/client';

import { GET_PHOTO } from '../graphql/queries';

const usePhoto = (variables) => {
  const {
    data, loading, ...result
  } = useQuery(GET_PHOTO, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    photo: data ? data.photo : undefined,
    loading,
    ...result,
  };
};

export default usePhoto;
