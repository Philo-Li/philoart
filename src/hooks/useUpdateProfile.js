import { useMutation } from '@apollo/client';

import { UPDATE_PROFILE } from '../graphql/mutations';

const useUpdateProfile = () => {
  const [mutate, result] = useMutation(UPDATE_PROFILE);

  const updateProfile = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [updateProfile, result];
};

export default useUpdateProfile;
