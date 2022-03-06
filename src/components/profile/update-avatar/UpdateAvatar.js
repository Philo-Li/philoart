import React, { useState } from 'react';
import AvatarEdit from './AvatarEdit';
import useUpdateAvatar from '../../../hooks/useUpdateAvatar';
import saveToS3 from '../../../utils/saveToS3';

const UpdateAvatar = ({ userId, preview, setPreview }) => {
  const [updateAvatar] = useUpdateAvatar();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      const photoId = `${userId}-avatar`;
      const buf = Buffer.from(preview.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const imageUrl = await saveToS3(photoId, buf);
      await updateAvatar({ url: imageUrl });
      setSuccessInfo('Avatar updated');
      setTimeout(() => { setSuccessInfo(''); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
    setLoading(false);
  };

  return (
    <AvatarEdit
      onSubmit={onSubmit}
      errorInfo={errorInfo}
      successInfo={successInfo}
      loading={loading}
      preview={preview}
      setPreview={setPreview}
    />
  );
};

export default UpdateAvatar;
