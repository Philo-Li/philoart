import { useMutation } from '@apollo/client';

import { DELETE_USER } from '../graphql/mutations';

const useDeleteUser = () => {
  const [mutate, result] = useMutation(DELETE_USER);

  const deleteUser = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [deleteUser, result];
};

export default useDeleteUser;
