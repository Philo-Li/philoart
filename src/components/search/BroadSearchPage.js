import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { createClient } from 'pexels';
import axios from 'axios';
import config from '../../config';
import SearchPagePhotoList from './SearchPagePhotoList';
import BroadSearchTagBar from '../others/BroadSearchTagBar';

const baseUrl = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = config.unsplashApi;

const merge = (a, b, prop) => {
  const reduced = a.filter((aitem) => !b.find((bitem) => aitem[prop] === bitem[prop]));
  return reduced.concat(b);
};

const BroadSearchPage = () => {
  const [pageNow, setPageNow] = useState(1);
  const [allPhotos, setAllPhotos] = useState();
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  const getPhotos = () => {
    const client = createClient(config.pexelApi);

    client.photos.search({ query: parsed.q, per_page: 10, page: pageNow })
      .then(async (response) => {
        const thisphotos = response.photos.map((obj) => {
          const updated = {
            id: obj.url,
            width: obj.width,
            height: obj.height,
            photographer: obj.photographer,
            description: '',
            tags: '',
            color: obj.avg_color,
            tiny: obj.src.small,
            small: obj.src.large,
            large: obj.src.original,
            downloadPage: obj.url,
            creditWeb: 'pexels',
            creditId: 'https://www.pexels.com/',
          };
          return updated;
        });
        const updatedAllPhotos = !allPhotos ? thisphotos : merge(allPhotos, thisphotos, 'downloadPage');

        // eslint-disable-next-line no-use-before-define
        searchUnsplash({
          query: parsed.q, perPage: 10, page: pageNow, updatedAllPhotos,
        });
      });
  };

  const searchUnsplash = ({
    query, perPage, page, updatedAllPhotos,
  }) => {
    const request = axios.get(`${baseUrl}?client_id=${ACCESS_KEY}&per_page=${perPage}&page=${page}&query=${query}`);
    return request.then((response) => {
      // console.log('unsplash result', response.data);
      if (!response.data.results) {
        setAllPhotos(updatedAllPhotos);
        return response.data;
      }
      const thisphotos = response.data.results.map((obj) => {
        const updated = {
          id: obj.links.html,
          width: obj.width,
          height: obj.height,
          photographer: obj.user.name,
          description: obj.alt_description || '',
          tags: '',
          color: obj.color,
          tiny: obj.urls.small,
          small: obj.urls.regular,
          large: obj.urls.full,
          downloadPage: obj.links.html,
          creditWeb: 'unsplash',
          creditId: 'https://unsplash.com/',
        };
        return updated;
      });

      const updatedAllPhotos2 = merge(updatedAllPhotos, thisphotos, 'downloadPage');
      // eslint-disable-next-line no-use-before-define
      searchKaboompics({
        query: parsed.q, perPage: 10, page: pageNow, updatedAllPhotos2,
      });
      return response.data;
    });
  };

  const searchKaboompics = ({
    // eslint-disable-next-line no-unused-vars
    query, perPage, page, updatedAllPhotos2,
  }) => {
    axios.get(`${config.pickyApi}/kaboompics/${query}`)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('kaboompics2', response.data);
        if (!response.data.photos) {
          setAllPhotos(updatedAllPhotos2);
          return response.data;
        }

        const thisphotos = response.data.photos.splice(0, 10);

        const updatedAllPhotos3 = merge(updatedAllPhotos2, thisphotos, 'downloadPage');

        setAllPhotos(updatedAllPhotos3);
        return response.data;
      });
  };

  useEffect(() => {
    if (location) {
      getPhotos();
    }
  }, [pageNow]);

  // console.log('photosToShow', photosToShow);

  const clickFetchMore = () => {
    setPageNow(pageNow + 1);
  };

  // eslint-disable-next-line no-console
  console.log('allPhotos', allPhotos);

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
      <BroadSearchTagBar />
      <SearchPagePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default BroadSearchPage;
