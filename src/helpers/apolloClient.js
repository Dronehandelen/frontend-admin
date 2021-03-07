import {
    ApolloClient,
    HttpLink,
    ApolloLink,
    InMemoryCache,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import appConfig from '../config/app';

export default class ApolloClientHelper {
    onLogout = () => {};

    apolloClient = new ApolloClient({
        link: ApolloLink.from([
            onError(({ graphQLErrors }) => {
                if (
                    graphQLErrors &&
                    graphQLErrors.some(({ type }) => type === 'not_logged_in')
                ) {
                    this.onLogout();
                }
            }),
            new HttpLink({
                uri: appConfig.apiUrl + '/api/v1/graphql',
                credentials: 'include',
            }),
        ]),
        cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
        defaultOptions: {
            query: {
                errorPolicy: 'all',
            },
        },
    });

    addLogoutListener(listener) {
        this.onLogout = listener;
    }
}
