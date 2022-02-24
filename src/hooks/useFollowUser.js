import { useMutation } from '@apollo/client';

import { FOLLOW_USER } from '../graphql/mutations';

const useFollowUser = () => {
  const [mutate, result] = useMutation(FOLLOW_USER);

  const followUser = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [followUser, result];
};

export default useFollowUser;
