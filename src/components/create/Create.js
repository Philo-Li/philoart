/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CreateContainer from './CreateContainer';
import useCreatePhoto from '../../hooks/useCreatePhoto';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

// const initialValues = {
//   title: 'Untitled',
//   titleZh: '无题',
//   year: new Date().getFullYear(),
//   description: '',
//   artworkWidth: 0,
//   artworkHeight: 0,
//   srcLarge: '',
//   srcYoutube: '',
//   artist: 'Philo',
//   license: 'Philo Art License',
//   type: 'painting',
//   medium: 'acrylic painting on canvas',
//   status: 'available',
//   relatedPhotos: '',
// };

const initialValues = {
  title: 'Untitled',
  description: '',
  license: 'Philo Art License',
  type: 'painting',
};

const Create = ({
  authorizedUser,
}) => {
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createPhoto] = useCreatePhoto();

  if (authorizedUser === undefined) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  const onSubmit = async (values) => {
    const {
      title, description,
      license, type,
    } = values;
    const variables = {
      title,
      titleZh: 'untitled',
      year: new Date().getFullYear(),
      description,
      artworkWidth: 0,
      artworkHeight: 0,
      srcLarge: 'https://images.pexels.com/photos/63901/pexels-photo-63901.jpeg?cs=srgb&dl=pexels-skitterphoto-63901.jpg&fm=jpg',
      srcYoutube: '',
      color: '2',
      artist: '1',
      license,
      type,
      medium: '',
      status: 'unavailable',
      relatedPhotos: '',
    };
    setLoading(true);
    console.log('submit', variables);
    try {
      await createPhoto(variables);
      history.push('/');
      setLoading(false);
    } catch (e) {
      setErrorInfo(e.message);
      setLoading(false);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
  };

  return (
    <CreateContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      errorInfo={errorInfo}
      loading={loading}
    />
  );
};

export default Create;
