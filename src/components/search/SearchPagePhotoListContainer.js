import React from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import SearchPhotoCard from './SearchPhotoCard';
import useCreateAndLikePhoto from '../../hooks/useCreateAndLikePhoto';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import useUnlikeAndDeletePhoto from '../../hooks/useUnlikeAndDeletePhoto';
// import useUncollectPhoto from '../../hooks/useUncollectPhoto';
// import useCreatePhotoAndCollectPhoto from '../../hooks/useCollectPhoto';

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 2,
};

const SearchPagePhotoListContainer = ({ allPhotos, setAllPhotos, clickFetchMore }) => {
  const { authorizedUser } = useAuthorizedUser();
  const [createAndLikePhoto] = useCreateAndLikePhoto();
  const [unlikeAndDeletePhoto] = useUnlikeAndDeletePhoto();
  // const [createPhotoAndCollectPhoto] = useCreatePhotoAndCollectPhoto();
  // const [uncollectPhoto] = useUncollectPhoto();
  const history = useHistory();

  const likeSinglePhoto = async (photo) => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      const temp = allPhotos
        .map((obj) => (obj.id === photo.id ? { ...obj, isLiked: !obj.isLiked } : obj));
      setAllPhotos(temp);
      if (photo.isLiked) {
        // console.log('unlike photo', photo.id);
        await unlikeAndDeletePhoto({ url: photo.downloadPage });
      } else {
        const variables = {
          width: photo.width,
          height: photo.height,
          color: photo.color,
          tiny: photo.tiny,
          small: photo.small,
          large: photo.large,
          downloadPage: photo.downloadPage,
          creditWeb: photo.creditWeb,
          creditId: photo.creditId,
          photographer: photo.photographer,
          description: photo.description || '',
          tags: photo.tags,
        };

        // console.log('like photo', photo, photo.id);
        await createAndLikePhoto(variables);
      }
    }
  };

  // const collectSinglePhoto = async (photo, collection) => {
  //   const updatedCollection = { ...collection, isCollected: !collection.isCollected };

  //   const updatedCollections = photo.allCollectionsToShow
  //     .map((obj) => (obj.id === collection.id ? updatedCollection : obj));

  //   const updatedPhoto = { ...photo, allCollectionsToShow: updatedCollections };
  //   const updatedAllPhotos = allPhotos.map((obj) => (obj.id === photo.id ? updatedPhoto : obj));
  //   setAllPhotos(updatedAllPhotos);

  //   if (collection.isCollected) {
  //     const photoCollections = photo.collections && photo.collections.edges
  //       ? photo.collections.edges.map((edge) => edge.node)
  //       : [];

  //     const collectedPhoto = photoCollections
  //       .find((collected) => collected.photo.id === photo.id);
  //     console.log('uncollect photo', photo.id, collection.id, collectedPhoto);
  //     // await uncollectPhoto({ id: collectedPhoto.id });
  //   } else {
  //     // await createPhotoAndCollectPhoto({ photoId: photo.id, collectionId: collection.id });
  //     console.log('collect photo', photo.id, collection.id);
  //   }
  // };

  return (
    <div className="p-3 daily-cover-container">
      <div className="">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {allPhotos.map((photo) => (
            <SearchPhotoCard
              key={photo.downloadPage}
              photo={photo}
              authorizedUser={authorizedUser}
              likeSinglePhoto={likeSinglePhoto}
              // collectSinglePhoto={collectSinglePhoto}
            />
          ))}
        </Masonry>
      </div>
      <div className="row-item-2">
        <button className="more-photos-btn" type="button" onClick={clickFetchMore}>
          <i className="bi bi-three-dots" />
          More photos
        </button>
      </div>
    </div>
  );
};

export default SearchPagePhotoListContainer;
