import { useMutation, useApolloClient } from '@apollo/client';

import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const payload = await mutate({ variables: { username, password } });
    const { data } = payload;

    if (data && data.authorize) {
      await localStorage.setItem('picky-user-token', data.authorize.accessToken);
      await localStorage.setItem('username', data.authorize.user.username);
      apolloClient.resetStore();
    }
    return payload;
  };

  return [signIn, result];
};

export default useSignIn;
