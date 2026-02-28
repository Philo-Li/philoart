"use client";

import { ApolloProvider } from "@apollo/client";
import { makeClient } from "./apollo-client";

const client = makeClient();

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
