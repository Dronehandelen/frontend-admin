import React from 'react';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import AuthProvider from './AuthProvider';

const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

const AUTH_REQUEST = gql`
    {
        auth {
            user {
                id
                firstName
                lastName
                email
                isAdmin
                emailConfirmed
                phone
                newsletter
                tawkToHash
                address {
                    id
                    address
                    postalCode
                    postalPlace
                    country
                    co
                }
                stripeCards {
                    paymentMethodId
                    brand
                    last4
                    expYear
                    expMonth
                }
            }
        }
    }
`;

const AuthProviderContainer = (props) => {
    const client = useApolloClient();
    const { loading, data, refetch } = useQuery(AUTH_REQUEST, {
        errorPolicy: 'all',
    });
    const [isLoggedOut, setIsLoggedOut] = React.useState(false);
    const [logout] = useMutation(LOGOUT);

    React.useEffect(() => {
        if (!data && isLoggedOut) {
            setIsLoggedOut(false);
        }
    }, [data, setIsLoggedOut, isLoggedOut]);

    return (
        <AuthProvider
            loading={loading}
            data={data}
            refetch={refetch}
            logout={() => {
                setIsLoggedOut(true);
                try {
                    logout().then(() => {
                        client.writeQuery({
                            query: AUTH_REQUEST,
                            data: {
                                auth: null,
                            },
                        });

                        setIsLoggedOut(false);
                    });
                } catch (e) {
                    console.error(e);
                }
            }}
            isLoggedOut={isLoggedOut}
        >
            {props.children}
        </AuthProvider>
    );
};

export default AuthProviderContainer;
