/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CreateContainer from './CreateContainer';
import useCreatePhoto from '../../hooks/useCreatePhoto';
import saveToS3 from '../../utils/saveToS3';
import config from '../../config';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const baseUrl = config.philoartApi;

const initialValues = {
  title: 'Untitled',
  description: '',
  license: 'Philo Art License',
  type: 'painting',
};

const Create = () => {
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createPhoto] = useCreatePhoto();
  const [files, setFiles] = useState([]);
  const [license, setLicense] = useState('CC BY-NC');
  const [type, setType] = useState('Photograph');
  const [status, setStatus] = useState('None');
  const [checked, setChecked] = useState(false);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  if (!userId) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  const onSubmit = async (values) => {
    const {
      title, description,
    } = values;

    setLoading(true);
    try {
      const imageKey = `${userId}-${nanoid(7)}`;
      const imageUrl = await saveToS3(imageKey, files[0]);

      // store the image data to the server
      const variables = {
        photoId: imageKey,
        title,
        year: new Date().getFullYear(),
        description,
        imageUrl,
        license,
        type,
        status,
        allowDownload: checked,
      };
      await createPhoto(variables);
      history.push(`/${username}`);
      setLoading(false);
    } catch (e) {
      setErrorInfo(e.message);
      setLoading(false);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <CreateContainer
        initialValues={initialValues}
        onSubmit={onSubmit}
        errorInfo={errorInfo}
        loading={loading}
        files={files}
        setFiles={setFiles}
        setLicense={setLicense}
        setType={setType}
        setStatus={setStatus}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Create;
