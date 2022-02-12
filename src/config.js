import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '/.env') });

export default {
  port: process.env.REACT_APP_PORT,
  graphqlUri: process.env.REACT_APP_GRAPHQL_URI,
  awsRegion: process.env.REACT_APP_AWS_REGION,
  awsS3Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
  awsAccessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  pexelApi: process.env.REACT_APP_PEXEL_API_KEY,
  pickyAdmin: process.env.REACT_APP_PICKY_ADMIN,
  visitorID: process.env.REACT_APP_PICKY_VISITOR,
  unsplashApi: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  pickyApi: process.env.REACT_APP_PICKY_API,
  moralisAppID: process.env.REACT_APP_MORALIS_APPLICATION_ID,
  moralisServerUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
};
