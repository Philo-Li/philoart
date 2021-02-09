import { useMutation } from '@apollo/client';

import { UNCOLLECT_PHOTO } from '../graphql/mutations';

const useUncollectPhoto = () => {
  const [mutate, result] = useMutation(UNCOLLECT_PHOTO);

  const uncollectPhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [uncollectPhoto, result];
};

export default useUncollectPhoto;
