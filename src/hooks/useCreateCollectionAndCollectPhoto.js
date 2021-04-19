import { useMutation } from '@apollo/client';

import { CREATE_COLLECTION_AND_COLLECT_PHOTO } from '../graphql/mutations';

const useCreateCollectionAndCollectPhoto = () => {
  const [mutate, result] = useMutation(CREATE_COLLECTION_AND_COLLECT_PHOTO);

  const createCollectionAndCollectPhoto = async (variables) => {
    await mutate({
      variables,
    });
  };
  let newCollection = null;
  if (result.data) {
    newCollection = result.data.createCollectionAndCollectPhoto.collection;
  }

  return [createCollectionAndCollectPhoto, newCollection];
};

export default useCreateCollectionAndCollectPhoto;
