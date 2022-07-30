import axios from 'axios';
import config from '../config';

const baseUrl = config.restApi;

const saveToS3 = async (photoId, buf) => {
  const { url } = await axios.get(`${baseUrl}/s3Url/${photoId}`).then((res) => res.data);

  // post the image direct to the s3 bucket
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/jpeg',
    },
    ContentEncoding: 'base64',
    body: buf,
  });

  const imageUrl = url.split('?')[0];
  return imageUrl;
};

export default saveToS3;
