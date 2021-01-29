/* eslint-disable no-undef */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import useCreatePhoto from '../hooks/useCreatePhoto';
import db from '../out';

// eslint-disable-next-line arrow-body-style
const Discover = () => {
  const [photoNow, setPhotoNow] = useState(0);
  const [createPhoto] = useCreatePhoto();
  const allPhotos = db.photos;

  if (!allPhotos) return null;

  const createNewPhoto = async () => {
    try {
      const photo = allPhotos[photoNow];

      // const variables = createNormalPhoto(photo, `Pexels_${photo.id}`);
      const variables = {
        width: photo.width,
        height: photo.height,
        small: photo.src.large,
        large: photo.src.original,
        downloadPage: photo.url,
        creditWeb: 'Pexels',
        creditId: `${photo.id}`,
        photographer: photo.photographer,
        description: '',
        tags: 'pexels',
      };
      console.log('photonow', photo, 'variables', variables);

      await createPhoto(variables);
      // eslint-disable-next-line no-alert
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const previousPhoto = () => {
    if ((photoNow - 1) < 0) window.alert('ending');
    else setPhotoNow(photoNow - 1);
  };

  const nextPhoto = () => {
    if ((photoNow + 1) > allPhotos.length) window.alert('ending');
    else setPhotoNow(photoNow + 1);
  };

  console.log(allPhotos[photoNow]);
  return (
    <div>
      <h1>Discover</h1>
      <Row className="sm my-2 my-lg-5">
        <Card style={{ width: '28rem' }}>
          <Card.Body key={allPhotos[photoNow].id}>
            <Card.Img src={allPhotos[photoNow].src.large} alt="Card image" />
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{photoNow} / {allPhotos.length} </Card.Title>
            <Button variant="primary" onClick={() => previousPhoto()}>Pre</Button>
            <Button variant="primary" onClick={() => nextPhoto()}>Next</Button>
            <Button variant="primary" onClick={() => createNewPhoto()}>添加</Button>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
};

export default Discover;
