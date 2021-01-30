import { useMutation } from '@apollo/client';

import { LIKE_PHOTO } from '../graphql/mutations';

const useLikePhoto = () => {
  const [mutate, result] = useMutation(LIKE_PHOTO);

  const likePhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [likePhoto, result];
};

export default useLikePhoto;
