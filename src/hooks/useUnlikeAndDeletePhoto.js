import { useMutation } from '@apollo/client';

import { UNLIKE_AND_DELETE_PHOTO } from '../graphql/mutations';

const useUnlikeAndDeletePhoto = () => {
  const [mutate, result] = useMutation(UNLIKE_AND_DELETE_PHOTO);

  const unlikeAndDeletePhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [unlikeAndDeletePhoto, result];
};

export default useUnlikeAndDeletePhoto;
