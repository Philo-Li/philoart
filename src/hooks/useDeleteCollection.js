import { useMutation } from '@apollo/client';

import { DELETE_COLLECTION } from '../graphql/mutations';

const useDeleteCollection = () => {
  const [mutate, result] = useMutation(DELETE_COLLECTION);

  const deleteCollection = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [deleteCollection, result];
};

export default useDeleteCollection;
