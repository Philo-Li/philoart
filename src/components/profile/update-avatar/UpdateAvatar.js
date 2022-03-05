import React, { useState } from 'react';
import AvatarEdit from './AvatarEdit';
import useUpdateAvatar from '../../../hooks/useUpdateAvatar';

const UpdateAvatar = ({ profileImage }) => {
  const [updateAvatar] = useUpdateAvatar();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    const variables = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    setLoading(true);

    try {
      await updateAvatar(variables);
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
      profileImage={profileImage}
    />
  );
};

export default UpdateAvatar;
