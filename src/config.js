import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '/.env') });

export default {
  port: process.env.REACT_APP_PORT,
  graphqlUri: process.env.GRAPHQL_URI_DEV,
  pexelApi: process.env.REACT_APP_PEXEL_API_KEY,
  pickyAdmin: process.env.REACT_APP_PICKY_ADMIN,
  visitorID: process.env.REACT_APP_PICKY_VISITOR,
  unsplashApi: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  pickyApi: process.env.REACT_APP_PICKY_API,
};
