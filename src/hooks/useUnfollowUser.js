import { useMutation } from '@apollo/client';

import { UNFOLLOW_USER } from '../graphql/mutations';

const useUnfollowUser = () => {
  const [mutate, result] = useMutation(UNFOLLOW_USER);

  const unfollowUser = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [unfollowUser, result];
};

export default useUnfollowUser;
