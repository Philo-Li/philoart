import { useMutation } from '@apollo/client';

import { EDIT_PHOTO_LABELS } from '../graphql/mutations';

const useEditPhotoLabels = () => {
  const [mutate, result] = useMutation(EDIT_PHOTO_LABELS);

  const editPhotoLabels = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [editPhotoLabels, result];
};

export default useEditPhotoLabels;
