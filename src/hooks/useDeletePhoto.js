import { useMutation } from '@apollo/client';

import { DELETE_PHOTO } from '../graphql/mutations';

const useDeletePhoto = () => {
  const [mutate, result] = useMutation(DELETE_PHOTO);

  const deletePhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [deletePhoto, result];
};

export default useDeletePhoto;
