import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateContainer from './CreateContainer';
import useCreatePhoto from '../../hooks/useCreatePhoto';

const initialValues = {
  title: 'Untitled',
  titleZh: '无题',
  year: 2020,
  description: '',
  tags: '',
  photoWidth: 0,
  photoHeight: 0,
  artworkWidth: 0,
  artworkHeight: 0,
  srcTiny: '',
  srcSmall: '',
  srcLarge: '',
  srcYoutube: '',
  artist: 'Philo',
  license: 'Philo Art License',
  color: '',
  type: 'painting',
  medium: 'acrylic painting on canvas',
  status: 'available',
  relatedPhotos: [],
};

const Create = () => {
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createPhoto] = useCreatePhoto();

  const onSubmit = async (values) => {
    const {
      title, titleZh, year, description, tags, photoWidth, photoHeight, artworkWidth,
      artworkHeight, srcTiny, srcSmall, srcLarge, srcYoutube, color, artist,
      license, type, medium, status,
    } = values;
    const variables = {
      title,
      titleZh,
      year,
      description,
      tags,
      photoWidth,
      photoHeight,
      artworkWidth,
      artworkHeight,
      srcTiny,
      srcSmall,
      srcLarge,
      srcYoutube,
      color,
      artist,
      license,
      type,
      medium,
      status,
      relatedPhotos: [],
    };
    setLoading(true);
    try {
      await createPhoto(variables);
      history.push('/');
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
