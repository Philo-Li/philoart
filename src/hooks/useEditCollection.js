import { useMutation } from '@apollo/client';

import { EDIT_COLLECTION } from '../graphql/mutations';

const useEditCollection = () => {
  const [mutate, result] = useMutation(EDIT_COLLECTION);

  const editCollection = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [editCollection, result];
};

export default useEditCollection;
