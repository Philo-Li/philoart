import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '/.env') });

export default {
  port: process.env.REACT_APP_PORT,
  graphqlUri: process.env.REACT_APP_GRAPHQL_URI,
};
