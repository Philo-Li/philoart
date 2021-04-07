import { useMutation } from '@apollo/client';

import { DOWNLOAD_PHOTO } from '../graphql/mutations';

const useDownloadPhoto = () => {
  const [mutate, result] = useMutation(DOWNLOAD_PHOTO);

  const downloadPhoto = async (variables) => {
    await mutate({
      variables,
    });
  };

  return [downloadPhoto, result];
};

export default useDownloadPhoto;
