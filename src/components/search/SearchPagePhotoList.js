import React from 'react';
import SearchPagePhotoListContainer from './SearchPagePhotoListContainer';

const SearchPagePhotoList = ({
  allPhotos, setAllPhotos, clickFetchMore,
}) => {
  if (allPhotos === undefined) return null;

  return (
    <div>
      <SearchPagePhotoListContainer
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default SearchPagePhotoList;
