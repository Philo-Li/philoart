import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client';
import { MoralisProvider } from 'react-moralis';
import { setContext } from 'apollo-link-context';
import config from './config';

import App from './App';

const MORALIS_APP_ID = config.moralisAppID;
const MORALIS_SERVER_URL = config.moralisServerUrl;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('philoart-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: config.graphqlUri });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </MoralisProvider>,
  document.getElementById('root'),
);
