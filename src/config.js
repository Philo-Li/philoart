import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '/.env') });

// console.log(process.env);

export default {
  port: process.env.REACT_APP_PORT,
  graphqlUri: process.env.REACT_APP_GRAPHQL_URI,
  pexelApi: process.env.REACT_APP_PEXEL_API_KEY,
  pickyAdmin: process.env.REACT_APP_PICKY_ADMIN,
  unsplashApi: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
};
