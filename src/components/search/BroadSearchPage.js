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
const MAX_PER_PAGE_BURST = 30;
// const MAX_PER_PAGE_PICO = 18;
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
    burst_hasnextpage: true,
    // pico: undefined,
    // pico_page: 1,
    // pico_hasnextpage: true,
  });
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const PerLoad = 5;

  const getPhotos = async () => {
    if (allPhotosPool.pexels === undefined || pageNow * PerLoad + PerLoad >= allPhotosPool.pexels.length) {
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
            ...allPhotosPool,
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

  const searchUnsplash = async (photosPool) => {
    if (allPhotosPool.unsplash === undefined || pageNow * PerLoad + PerLoad >= allPhotosPool.unsplash.length) {
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
          getPhotosToShowQuick(photosPool2);
          return response.data;
        });
    } else {
      searchKaboompics(photosPool);
    }
    return true;
  };

  const searchKaboompics = async (photosPool2) => {
    // const queryPageNow = allPhotosPool.kaboompics_page;
    if (allPhotosPool.kaboompics === undefined) {
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
    } else {
      searchBurst(photosPool2);
    }
    return true;
  };

  const searchBurst = async (photosPool3) => {
    if (allPhotosPool.burst === undefined || (pageNow * PerLoad + PerLoad >= allPhotosPool.burst.length && allPhotosPool.burst_hasnextpage)) {
      const queryPageNow = allPhotosPool.burst_page;
      axios.get(`${config.pickyApi}/burst/page=${queryPageNow}&q=${parsed.q}`)
        .then((response) => {
          if (!response.data.photos) {
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
          const hasNextPage = !(thisphotos.length < MAX_PER_PAGE_BURST);
          const photosPool4 = {
            ...photosPool3,
            burst: updatedBurstPool,
            burst_page: allPhotosPool.burst_page + 1,
            burst_hasnextpage: hasNextPage,
          };

          setAllPhotosPool(photosPool4);
          getPhotosToShow(photosPool4);
          // eslint-disable-next-line no-use-before-define
          return response.data;
        });
    } else {
      setAllPhotosPool(photosPool3);
      getPhotosToShow(photosPool3);
    }
    return true;
  };

  // const searchPicography = async (photosPool4) => {
  //   if (allPhotosPool.pico === undefined || (pageNow * PerLoad + PerLoad >= allPhotosPool.pico.length && allPhotosPool.pico_hasnextpage)) {
  //     const queryPageNow = allPhotosPool.pico_page;
  //     axios.get(`${config.pickyApi}/picography/page=${queryPageNow}&q=${parsed.q}`)
  //       .then((response) => {
  //         if (!response.data.photos) {
  //           setAllPhotosPool(photosPool4);
  //           return response.data;
  //         }

  //         const thisphotos = response.data.photos.map((obj) => {
  //           const updated = {
  //             width: obj.width || 0,
  //             height: obj.height || 0,
  //             photographer: obj.photographer || '',
  //             description: obj.description,
  //             tags: obj.tags || '',
  //             color: obj.color,
  //             tiny: obj.tiny,
  //             small: obj.small,
  //             large: obj.large,
  //             downloadPage: obj.downloadPage,
  //             creditWeb: obj.creditWeb,
  //             creditId: obj.creditId,
  //           };
  //           return updated;
  //         });

  //         const picoPool = allPhotosPool.pico;
  //         const updatedPicoPool = !picoPool ? thisphotos : merge(picoPool, thisphotos, 'downloadPage');
  //         const hasNextPage = !(thisphotos.length < MAX_PER_PAGE_PICO);
  //         const photosPool5 = {
  //           ...photosPool4,
  //           pico: updatedPicoPool,
  //           pico_page: allPhotosPool.pico_page + 1,
  //           pico_hasnextpage: hasNextPage,
  //         };

  //         setAllPhotosPool(photosPool5);
  //         // eslint-disable-next-line no-use-before-define
  //         getPhotosToShow(photosPool5);
  //         return response.data;
  //       });
  //   } else {
  //     setAllPhotosPool(photosPool4);
  //     getPhotosToShow(photosPool4);
  //   }
  //   return true;
  // };

  const getPhotosToShow = async (photosPool4) => {
    const Start = pageNow * PerLoad - PerLoad;
    const End = pageNow * PerLoad;
    const slicedPhotos1 = photosPool4.pexels.slice(Start, End);
    const slicedPhotos2 = photosPool4.unsplash.slice(Start, End);
    const slicedPhotos3 = photosPool4.kaboompics.slice(Start, End);
    const slicedPhotos4 = photosPool4.burst.slice(Start, End);

    const newLoad = [...slicedPhotos1, ...slicedPhotos2, ...slicedPhotos3, ...slicedPhotos4];
    const updatedAllPhotos = !allPhotos ? newLoad : merge(allPhotos, newLoad, 'downloadPage');
    setAllPhotos(updatedAllPhotos);
    setLoading(false);
  };

  const getPhotosToShowQuick = async (photosPool) => {
    const Start = pageNow * PerLoad - PerLoad;
    const End = pageNow * PerLoad;
    const slicedPhotos1 = photosPool.pexels.slice(Start, End);
    const slicedPhotos2 = photosPool.unsplash.slice(Start, End);

    const newLoad = [...slicedPhotos1, ...slicedPhotos2];
    const updatedAllPhotos = !allPhotos ? newLoad : merge(allPhotos, newLoad, 'downloadPage');
    setAllPhotos(updatedAllPhotos);
    setLoading(false);
  };

  useEffect(() => {
    if (location) {
      getPhotos();
    }
  }, [pageNow]);

  console.log('photosPool', allPhotosPool);

  const clickFetchMore = () => {
    setPageNow(pageNow + 1);
    setLoading(true);
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
        loading={loading}
      />
    </div>
  );
};

export default BroadSearchPage;
