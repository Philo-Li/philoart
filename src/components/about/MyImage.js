import React from 'react';

const MyImage = ({ image }) => {
  if (!image) return null;
  return (
    <picture>
      <source media="(max-width: 800px)" srcSet={image.srcTiny} alt="" />
      <source media="(max-width: 2100px)" srcSet={image.srcLarge} alt="" />
      <img
        src={image.srcSmall}
        width="80%"
        alt="gird item"
        className="container-col-about"
      />
    </picture>
  );
};

export default MyImage;
