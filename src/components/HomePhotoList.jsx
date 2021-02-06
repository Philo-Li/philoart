/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import '../index.css';
import HomePhotoListContainer from './HomePhotoListContainer';
// import useCollections from '../hooks/useCollections';

// eslint-disable-next-line react/prefer-stateless-function
const HomePhotoList = ({ allPhotos, setAllPhotos, clickFetchMore, allCollections, setAllCollections }) => {
  // const [allCollections, setAllCollections] = useState();
  if (allPhotos === undefined) return null;
  if (!allCollections) return null;
  // const { collections } = useCollections({ userId: authorizedUser && authorizedUser.id, first: 30 });
  // console.log(collections);

  // useEffect(() => {
  //   if (collections) {
  //     const temp = collections && collections.edges
  //       ? collections.edges.map((edge) => edge.node)
  //       : [];
  //     setAllCollections(temp);
  //     const updatedAllPhotos = allPhotos.map((photo) => {
  //       const photoInCollections = photo.collections && photo.collections.edges
  //         ? photo.collections.edges.map((edge) => edge.node)
  //         : [];
  //       const collectionsToShow = temp.map((collection) => {
  //         const findPhoto = photoInCollections.find((obj) => obj.id === collection.id);
  //         return findPhoto ? { ...collection, isCollected: true } : { ...collection, isCollected: false };
  //       });
  //       const updatedPhoto = { ...photo, allCollectionsStatus: collectionsToShow };
  //       console.log('updatedPhoto', updatedPhoto);
  //       return updatedPhoto;
  //     });
  //     console.log('updatedAllPhotos', updatedAllPhotos);
  //     setAllPhotos(updatedAllPhotos);
  //     // const updatedAllCollections = temp.map((collection) => {
  //     //   const collectedPhotos = collection.photos && collection.photos.edges
  //     //     ? collection.photos.edges.map((edge) => edge.node)
  //     //     : [];

  //     //   const findPhoto = collectedPhotos.find((obj) => obj.id === photo.id);
  //     //   return findPhoto ? { ...collection, isCollected: true } : { ...collection, isCollected: false };
  //     // });
  //     // console.log('updatedAllCollections', updatedAllCollections);
  //     console.log('collections', temp);
  //   }
  // }, [collections]);

  return (
    <div className="p-3">
      <HomePhotoListContainer
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        allCollections={allCollections}
        setAllCollections={setAllCollections}
      />
    </div>
  );
};

export default HomePhotoList;
