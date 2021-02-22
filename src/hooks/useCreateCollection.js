import { useMutation } from '@apollo/client';

import { CREATE_COLLECTION } from '../graphql/mutations';

const useCreateCollection = () => {
  const [mutate, result] = useMutation(CREATE_COLLECTION);

  const createCollection = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [createCollection, result];
};

export default useCreateCollection;
