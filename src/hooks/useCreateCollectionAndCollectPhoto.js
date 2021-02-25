import { useMutation } from '@apollo/client';

import { CREATE_COLLECTION_AND_COLLECT_PHOTO } from '../graphql/mutations';

const useCreateCollectionAndCollectPhoto = () => {
  const [mutate, result] = useMutation(CREATE_COLLECTION_AND_COLLECT_PHOTO);

  const createCollectionAndCollectPhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [createCollectionAndCollectPhoto, result];
};

export default useCreateCollectionAndCollectPhoto;
