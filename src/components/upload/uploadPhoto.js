import React, { useState } from 'react';
import AWS from 'aws-sdk';
import config from '../../config';

const S3_BUCKET = config.awsS3Bucket;
const REGION = config.awsRegion;
const ACCESS_KEY_ID = config.awsAccessKeyId;
const SECRET_ACCESS_KEY = config.awsSecretAccessKey;

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadImageToS3WithNativeSdk = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <div>
        Native SDK File Upload Progress is
        {' '}
        {progress}
        %
      </div>
      <input type="file" onChange={handleFileInput} />
      <button type="submit" onClick={() => uploadFile(selectedFile)}>
        Upload to S3
      </button>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
