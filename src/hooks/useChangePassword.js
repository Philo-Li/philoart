import { useMutation } from '@apollo/client';

import { CHANGE_PASSWORD } from '../graphql/mutations';

const useChangePassword = () => {
  const [mutate, result] = useMutation(CHANGE_PASSWORD);

  const changePassword = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [changePassword, result];
};

export default useChangePassword;
