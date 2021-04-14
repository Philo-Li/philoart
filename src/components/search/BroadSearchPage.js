/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
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
const MAX_PER_PAGE_PEXELS = 80;
const MAX_PER_PAGE_UNSPLASH = 30;
// const MAX_PER_PAGE_KABOOMPICS = 100;

const merge = (a, b, prop) => {
  const reduced = a.filter((aitem) => !b.find((bitem) => aitem[prop] === bitem[prop]));
  return reduced.concat(b);
};

const BroadSearchPage = () => {
  const [pageNow, setPageNow] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPhotos, setAllPhotos] = useState();
  const [allPhotosPool, setAllPhotosPool] = useState({
    pexels: undefined,
    pexels_page: 1,
    unsplash: undefined,
    unsplash_page: 1,
    kaboompics: undefined,
    kaboompics_page: 1,
    burst: undefined,
    burst_page: 1,
  });
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const PerLoad = 5;

  const getPhotos = () => {
    if (allPhotosPool.pexels === undefined || pageNow * PerLoad >= allPhotosPool.pexels.length) {
      let photosPool;
      const client = createClient(config.pexelApi);
      const queryPageNow = allPhotosPool.pexels_page;

      client.photos.search({ query: parsed.q, per_page: MAX_PER_PAGE_PEXELS, page: queryPageNow })
        .then(async (response) => {
          const thisphotos = response.photos.map((obj) => {
            const updated = {
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

          const pexelsPool = allPhotosPool.pexels;
          const updatedPexelsPool = pexelsPool === undefined ? thisphotos : merge(pexelsPool, thisphotos, 'downloadPage');
          photosPool = {
            pexels: updatedPexelsPool,
            pexels_page: allPhotosPool.pexels_page + 1,
          };
          searchUnsplash(photosPool);
          return response.data;
        });
    } else {
      searchUnsplash(allPhotosPool);
    }
  };

  const searchUnsplash = (photosPool) => {
    if (allPhotosPool.unsplash === undefined || pageNow * PerLoad >= allPhotosPool.unsplash.length) {
      const perPage = MAX_PER_PAGE_UNSPLASH;
      const queryPageNow = allPhotosPool.unsplash_page;
      axios.get(`${baseUrl}?client_id=${ACCESS_KEY}&per_page=${perPage}&page=${queryPageNow}&query=${parsed.q}`)
        .then((response) => {
          if (!response.data.results) {
            searchKaboompics(photosPool);
            return response.data;
          }
          const thisphotos = response.data.results.map((obj) => {
            const updated = {
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

          const unsplashPool = allPhotosPool.unsplash;
          const updatedUnsplashPool = !unsplashPool ? thisphotos : merge(unsplashPool, thisphotos, 'downloadPage');
          const photosPool2 = {
            ...photosPool,
            unsplash: updatedUnsplashPool,
            unsplash_page: allPhotosPool.unsplash_page + 1,
          };
          searchKaboompics(photosPool2);
          return response.data;
        });
    } else {
      searchKaboompics(allPhotosPool);
    }
    return true;
  };

  const searchKaboompics = (photosPool2) => {
    // const queryPageNow = allPhotosPool.kaboompics_page;
    axios.get(`${config.pickyApi}/kaboompics/${parsed.q}`)
      .then((response) => {
        if (!response.data.photos) {
          setAllPhotosPool(photosPool2);
          return response.data;
        }

        const thisphotos = response.data.photos.map((obj) => {
          const updated = {
            width: obj.width || 0,
            height: obj.height || 0,
            photographer: obj.photographer || '',
            description: obj.description,
            tags: obj.tags || '',
            color: obj.color,
            tiny: obj.tiny,
            small: obj.small,
            large: obj.large,
            downloadPage: obj.downloadPage,
            creditWeb: obj.creditWeb,
            creditId: obj.creditId,
          };
          return updated;
        });

        const kaboompicsPool = allPhotosPool.kaboompics;
        const updatedKaboompicsPool = !kaboompicsPool ? thisphotos : merge(kaboompicsPool, thisphotos, 'downloadPage');
        const photosPool3 = {
          ...photosPool2,
          kaboompics: updatedKaboompicsPool,
          kaboompics_page: allPhotosPool.kaboompics_page + 1,
        };
        // eslint-disable-next-line no-use-before-define
        searchBurst(photosPool3);
        return response.data;
      });
  };

  const searchBurst = (photosPool3) => {
    const queryPageNow = allPhotosPool.burst_page;
    axios.get(`${config.pickyApi}/burst/page=${queryPageNow}&q=${parsed.q}`)
      .then((response) => {
        if (response.data.photos.length === 0) {
          setAllPhotosPool(photosPool3);
          return response.data;
        }

        const thisphotos = response.data.photos.map((obj) => {
          const updated = {
            width: obj.width || 0,
            height: obj.height || 0,
            photographer: obj.photographer || '',
            description: obj.description,
            tags: obj.tags || '',
            color: obj.color,
            tiny: obj.tiny,
            small: obj.small,
            large: obj.large,
            downloadPage: obj.downloadPage,
            creditWeb: obj.creditWeb,
            creditId: obj.creditId,
          };
          return updated;
        });

        const burstPool = allPhotosPool.burst;
        const updatedBurstPool = !burstPool ? thisphotos : merge(burstPool, thisphotos, 'downloadPage');
        const photosPool4 = {
          ...photosPool3,
          burst: updatedBurstPool,
          burst_page: allPhotosPool.burst_page + 1,
        };

        setAllPhotosPool(photosPool4);
        // eslint-disable-next-line no-use-before-define
        getPhotosToShow(photosPool4);
        return response.data;
      });
  };

  const getPhotosToShow = (photosPool4) => {
    const slicedPhotos1 = photosPool4.pexels.slice(0, pageNow * PerLoad);
    const slicedPhotos2 = photosPool4.unsplash.slice(0, pageNow * PerLoad);
    const slicedPhotos3 = photosPool4.kaboompics.slice(0, pageNow * PerLoad);
    const slicedPhotos4 = photosPool4.burst.slice(0, pageNow * PerLoad);
    const merged = [...slicedPhotos1, ...slicedPhotos2, ...slicedPhotos3, ...slicedPhotos4];
    setAllPhotos(merged);
    setLoading(false);
  };

  useEffect(() => {
    if (location) {
      getPhotos();
    }
  }, [pageNow]);

  // console.log('photosPool', allPhotosPool);

  const clickFetchMore = () => {
    setPageNow(pageNow + 1);
    setLoading(true);
  };

  // eslint-disable-next-line no-console
  // console.log('allPhotos', allPhotos);

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
        loading={loading}
      />
    </div>
  );
};

export default BroadSearchPage;
