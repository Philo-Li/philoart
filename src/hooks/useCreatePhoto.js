import { useMutation } from '@apollo/client';

import { CREATE_PHOTO } from '../graphql/mutations';

const useCreatePhoto = () => {
  const [mutate, result] = useMutation(CREATE_PHOTO);

  const createPhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [createPhoto, result];
};

export default useCreatePhoto;
