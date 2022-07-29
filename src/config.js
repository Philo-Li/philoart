import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '/.env') });

export default {
  port: process.env.REACT_APP_PORT,
  graphqlUri: process.env.REACT_APP_GRAPHQL_URI,
  philoartAdmin: process.env.REACT_APP_PHILOART_ADMIN,
  visitorID: process.env.REACT_APP_PHILOART_VISITOR,
  restApi: process.env.REACT_APP_PHILOART_API,
  moralisAppID: process.env.REACT_APP_MORALIS_APPLICATION_ID,
  moralisServerUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
};
