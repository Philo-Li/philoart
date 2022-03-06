import { useMutation } from '@apollo/client';

import { UPDATE_AVATAR } from '../graphql/mutations';

const useUpdateAvatar = () => {
  const [mutate, result] = useMutation(UPDATE_AVATAR);

  const updateAvatar = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [updateAvatar, result];
};

export default useUpdateAvatar;
