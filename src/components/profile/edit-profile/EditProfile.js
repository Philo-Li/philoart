import React, { useState } from 'react';
import useUpdateProfile from '../../../hooks/useUpdateProfile';
import EditProfileContainer from './EditProfileContainer';

const EditProfile = ({ user }) => {
  const [updateProfile] = useUpdateProfile();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName || '',
    email: user.email,
    username: user.username,
    description: user.description,
    password: '',
  };

  const onSubmit = async (values) => {
    const variables = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      description: values.description,
      password: values.password,
    };
    setLoading(true);

    try {
      await updateProfile(variables);
      setSuccessInfo('Profile updated');
      setTimeout(() => { setSuccessInfo(''); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
    setLoading(false);
  };

  return (
    <EditProfileContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      errorInfo={errorInfo}
      successInfo={successInfo}
      loading={loading}
    />
  );
};

export default EditProfile;
