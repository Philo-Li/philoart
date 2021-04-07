import { useMutation } from '@apollo/client';

import { CREATE_AND_LIKE_PHOTO } from '../graphql/mutations';

const useCreateAndLikePhoto = () => {
  const [mutate, result] = useMutation(CREATE_AND_LIKE_PHOTO);

  const createAndLikePhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [createAndLikePhoto, result];
};

export default useCreateAndLikePhoto;
