import { useMutation, useApolloClient } from '@apollo/client';

import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    await mutate({ variables: { username, password } });
    localStorage.setItem('picky-user-token', result.data.authorize.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
