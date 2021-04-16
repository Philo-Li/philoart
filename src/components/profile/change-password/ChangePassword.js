import React, { useState } from 'react';
import useChangePassword from '../../../hooks/useChangePassword';
import ChangePasswordContainer from './ChangePasswordContainer';

const ChangePassword = () => {
  const [changePassword] = useChangePassword();
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    currentPassword: '',
    newPassword: '',
  };

  const onSubmit = async (values) => {
    const variables = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    setLoading(true);

    try {
      await changePassword(variables);
      setSuccessInfo('Password changed');
      setTimeout(() => { setSuccessInfo(''); }, 3000);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
    setLoading(false);
  };

  return (
    <ChangePasswordContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      errorInfo={errorInfo}
      successInfo={successInfo}
      loading={loading}
    />
  );
};

export default ChangePassword;
