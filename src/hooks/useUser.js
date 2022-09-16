import { useQuery } from '@apollo/client';

import { GET_USER } from '../graphql/queries';

const useUser = (variables) => {
  const {
    data, loading, ...result
  } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    user: data ? data.user : undefined,
    loading,
    ...result,
  };
};

export default useUser;
