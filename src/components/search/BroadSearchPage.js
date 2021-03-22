import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { createClient } from 'pexels';
import axios from 'axios';
import config from '../../config';
import SearchPagePhotoList from './SearchPagePhotoList';
import TagBar from '../others/TagBar';

const baseUrl = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = config.unsplashApi;

const BroadSearchPage = () => {
  const [pageNow, setPageNow] = useState(1);
  const [photosToShow, setPhotosToShow] = useState();
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  const getPhotos = () => {
    const client = createClient(config.pexelApi);

    client.photos.search({ query: parsed.q, per_page: 10, page: pageNow })
      .then(async (response) => {
        const thisphotos = response.photos.map((obj) => {
          const updated = {
            ...obj,
            creditWeb: 'pexels',
          };
          return updated;
        });
        if (photosToShow === undefined) {
          setPhotosToShow(thisphotos);
        } else {
          const filterPhotos = thisphotos
            .filter((photo) => {
              const res = photosToShow.filter((temp) => temp.id === photo.id);
              if (res.length === 1) return false;
              return true;
            });

          const updatedPhotosToShow = [...photosToShow, ...filterPhotos];

          // eslint-disable-next-line no-use-before-define
          searchUnsplash({
            query: parsed.q, perPage: 10, page: pageNow, updatedPhotosToShow,
          });
          // setPhotosToShow(updatedPhotosToShow);
        }
      });
  };

  const searchUnsplash = ({
    query, perPage, page, updatedPhotosToShow,
  }) => {
    const request = axios.get(`${baseUrl}?client_id=${ACCESS_KEY}&per_page=${perPage}&page=${page}&query=${query}`);
    return request.then((response) => {
      if (!response.data.results) {
        setPhotosToShow(updatedPhotosToShow);
        return response.data;
      }
      const thisphotos = response.data.results.map((obj) => {
        const updated = {
          ...obj,
          src: {
            large: obj.urls.regular,
          },
          url: obj.links.html,
          creditWeb: 'unsplash',
        };
        return updated;
      });
      const filterPhotos = thisphotos
        .filter((photo) => {
          const res = updatedPhotosToShow.filter((temp) => temp.id === photo.id);
          if (res.length === 1) return false;
          return true;
        });

      const updatedPhotosToShow2 = [...updatedPhotosToShow, ...filterPhotos];
      setPhotosToShow(updatedPhotosToShow2);
      return response.data;
    });
  };

  useEffect(() => {
    if (location) {
      getPhotos();
      axios.get(`${config.pickyApi}/photos`)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          // console.log('kaboompics', response.data);
        });
    }
  }, [pageNow]);

  // console.log('photosToShow', photosToShow);

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
