import { useMutation } from '@apollo/client';

import { UNLIKE_PHOTO } from '../graphql/mutations';

const useUnlikePhoto = () => {
  const [mutate, result] = useMutation(UNLIKE_PHOTO);

  const unlikePhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [unlikePhoto, result];
};

export default useUnlikePhoto;
