import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { createClient } from 'pexels';
import config from '../config';
import SearchPagePhotoList from './SearchPagePhotoList';
import TagBar from './TagBar';

const BroadSearchPage = () => {
  const [pageNow, setPageNow] = useState(1);
  const [photosToShow, setPhotosToShow] = useState();
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  const getPhotos = () => {
    const client = createClient(config.pexelApi);

    client.photos.search({ query: parsed.q, per_page: 30, page: pageNow })
      .then(async (thisphotos) => {
        if (photosToShow === undefined) {
          setPhotosToShow(thisphotos.photos);
        } else {
          const filterPhotos = thisphotos.photos
            .filter((photo) => {
              const res = photosToShow.filter((temp) => temp.id === photo.id);
              if (res.length === 1) return false;
              return true;
            });

          const updatedPhotosToShow = [...photosToShow, ...filterPhotos];
          setPhotosToShow(updatedPhotosToShow);
        }
      });
  };

  useEffect(() => {
    if (location) {
      getPhotos();
    }
  }, [pageNow]);

  console.log('photosToShow', photosToShow);

  const clickFetchMore = () => {
    setPageNow(pageNow + 1);
  };

  if (!photosToShow) return null;

  return (
    <div>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Search:</h1>
        </div>
        <div className="profile-item">
          <h1>{parsed.q}</h1>
        </div>
      </div>
      <TagBar />
      <SearchPagePhotoList
        allPhotos={photosToShow}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default BroadSearchPage;
