import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || "http://localhost:5005/graphql",
});

// Auth link for adding token to requests
const authLink = setContext((_, { headers }) => {
  // Get token from localStorage (client-side only)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Client-side Apollo Client (singleton)
let clientSideClient: ApolloClient<unknown> | null = null;

export function getClient() {
  // Server-side: always create new client
  if (typeof window === "undefined") {
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      ssrMode: true,
    });
  }

  // Client-side: reuse singleton
  if (!clientSideClient) {
    clientSideClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  return clientSideClient;
}

// For use with ApolloProvider in client components
export function makeClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
