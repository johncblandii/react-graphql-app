import { ApolloClient, createNetworkInterface } from 'react-apollo';

export const apolloClient = new ApolloClient({
 networkInterface: createNetworkInterface({
   uri: 'https://api.graph.cool/simple/v1/cj864jf2302n30112ip74zkoy',
 }),
});
