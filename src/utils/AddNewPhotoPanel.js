/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import { createClient } from 'pexels';
import axios from 'axios';
import useCreatePhoto from '../hooks/useCreatePhoto';
import config from '../config';
import db from '../out';
import usePhotos from '../hooks/usePhotos';
import useEditPhotoLabels from '../hooks/useEditPhotoLabels';

const baseUrl = 'https://kaboompics.com/gallery?search=';

// eslint-disable-next-line arrow-body-style
const AddNewPhotoPanel = () => {
  const [photoNow, setPhotoNow] = useState(0);
  const [photosPool, setPhotosPool] = useState();
  const [createPhoto] = useCreatePhoto();
  const [editPhotoLabels] = useEditPhotoLabels();
  const allPhotos = db.photos;

  const { photos, fetchMore } = usePhotos({ first: 30, searchKeyword: 'dog,cat' });

  if (!allPhotos || !photos) return null;

  const getPhotos = () => {
    const client = createClient(config.pexelApi);

    client.photos.curated({ per_page: 80, page: 21 }).then((thisphotos) => {
      setPhotosPool(thisphotos.photos);
      // console.log('photos pexels', photos, photosPool);
    });
  };

  const createNewPhoto = async () => {
    try {
      const photo = photosPool[photoNow];

      // const variables = createNormalPhoto(photo, `Pexels_${photo.id}`);
      const variables = {
        width: photo.width,
        height: photo.height,
        tiny: photo.src.small,
        small: photo.src.large,
        large: photo.src.original,
        downloadPage: photo.url,
        creditWeb: 'Pexels',
        creditId: `${photo.id}`,
        photographer: photo.photographer,
        description: '',
        tags: 'pexels',
      };
      // console.log('photonow', photo, 'variables', variables);

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

  let temp = photos && photos.edges
    ? photos.edges.map((edge) => edge.node)
    : [];

  const updatePhotoLabels = async () => {
    for (let i = 0; i < temp.length; i += 1) {
      const tags = JSON.parse(temp[i].tags);
      let getlabels = [];

      // eslint-disable-next-line no-unused-vars
      const temp2 = tags.map((node) => {
        if (node.confidence > 20) {
          getlabels = [...getlabels, node.tag.en];
        }
        return true;
      });
      editPhotoLabels({ photoId: temp[i].id });
      // console.log(getlabels, temp2.length);
    }
  };

  const getMorePhotos = () => {
    fetchMore();
    temp = photos && photos.edges
      ? photos.edges.map((edge) => edge.node)
      : [];
    setPhotosPool(temp);
  };

  const getHtml = () => {
    const query = 'dog';
    const request = axios.get(`${baseUrl}${query}&sortby=`);
    return request.then((response) => {
      console.log(response);
      return response.data;
    });
  };

  return (
    <div>
      <h1>Discover</h1>
      <Row className="sm my-2 my-lg-5 flex-end">
        <Card style={{ width: '18rem' }}>
          <Card.Title>Edit Photo Labels</Card.Title>
          <Card.Body>
            <Card.Title>{photoNow} / {allPhotos.length} </Card.Title>
            <Button variant="primary" onClick={() => previousPhoto()}>Pre</Button>
            <Button variant="primary" onClick={() => nextPhoto()}>Next</Button>
            <Button variant="primary" onClick={() => updatePhotoLabels()}>添加</Button>
            <Button variant="primary" onClick={() => getMorePhotos()}>setPhotoPool</Button>
          </Card.Body>
        </Card>
      </Row>
      <Row className="sm my-2 my-lg-5 flex-end">
        <Card style={{ width: '18rem' }}>
          <Card.Title>Get Html</Card.Title>
          <Card.Body>
            <Button variant="primary" onClick={() => getHtml()}>Get</Button>
          </Card.Body>
        </Card>
      </Row>
      <Row className="sm my-2 my-lg-5 flex-end">
        <Card style={{ width: '28rem' }}>
          <Card.Body key={allPhotos[photoNow].id}>
            {photosPool && <Card.Img src={photosPool[photoNow].src.large} alt="Card image" />}
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Title>Create New Photo</Card.Title>
          <Card.Body>
            <Card.Title>{photoNow} / {allPhotos.length} </Card.Title>
            <Button variant="primary" onClick={() => previousPhoto()}>Pre</Button>
            <Button variant="primary" onClick={() => nextPhoto()}>Next</Button>
            <Button variant="primary" onClick={() => createNewPhoto()}>添加</Button>
            <Button variant="primary" onClick={() => getPhotos()}>setPhotoPool</Button>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
};

export default AddNewPhotoPanel;
