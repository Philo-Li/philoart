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
  philoartAdmin: process.env.REACT_APP_PHILOART_ADMIN,
  visitorID: process.env.REACT_APP_PHILOART_VISITOR,
  philoartApi: process.env.REACT_APP_PHILOART_API,
  moralisAppID: process.env.REACT_APP_MORALIS_APPLICATION_ID,
  moralisServerUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
};
