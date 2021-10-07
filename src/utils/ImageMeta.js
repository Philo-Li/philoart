import React from 'react';
import EXIF from 'exif-js';

function ImageMeta() {
  function handleChange({
    target: {
      files: [file],
    },
  }) {
    if (file && file.name) {
      EXIF.getData(file, () => {
        const exifData = EXIF.pretty(this);
        if (exifData) {
          console.log(exifData);
          console.log(EXIF.getTag(this, 'Orientation'));
        } else {
          console.log("No EXIF data found in image '", file.name, "'.");
        }
      });
    }
  }

  return (
    <input
      type="file"
      id="file"
      accept=".jpg, .png, .heif, .heic"
      onChange={handleChange}
    />
  );
}

export default ImageMeta;
