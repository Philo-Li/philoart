import { useMutation } from '@apollo/client';

import { COLLECT_PHOTO } from '../graphql/mutations';

const useCollectPhoto = () => {
  const [mutate, result] = useMutation(COLLECT_PHOTO);

  const collectPhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [collectPhoto, result];
};

export default useCollectPhoto;
