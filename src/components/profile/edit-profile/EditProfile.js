import React, { useState } from 'react';
import useUpdateProfile from '../../../hooks/useUpdateProfile';
import EditProfileContainer from './EditProfileContainer';

const EditProfile = ({ authorizedUser }) => {
  const [updateProfile] = useUpdateProfile();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  const initialValues = {
    firstName: authorizedUser.firstName,
    lastName: authorizedUser.lastName,
    email: authorizedUser.email,
    username: authorizedUser.username,
    password: '',
  };

  const onSubmit = async (values) => {
    const variables = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
    };

    try {
      await updateProfile(variables);
      setSuccessInfo('Profile updated');
      setTimeout(() => { setSuccessInfo(''); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <EditProfileContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      errorInfo={errorInfo}
      successInfo={successInfo}
    />
  );
};

export default EditProfile;
