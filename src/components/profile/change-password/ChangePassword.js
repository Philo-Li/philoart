import React, { useState } from 'react';
import useChangePassword from '../../../hooks/useChangePassword';
import ChangePasswordContainer from './ChangePasswordContainer';

const ChangePassword = () => {
  const [changePassword] = useChangePassword();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  const initialValues = {
    currentPassword: '',
    newPassword: '',
  };

  const onSubmit = async (values) => {
    const variables = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

    try {
      await changePassword(variables);
      setSuccessInfo('Password changed');
      setTimeout(() => { setSuccessInfo(''); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <ChangePasswordContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      errorInfo={errorInfo}
      successInfo={successInfo}
    />
  );
};

export default ChangePassword;
