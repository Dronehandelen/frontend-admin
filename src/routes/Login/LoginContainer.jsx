import React from 'react';
import { gql, useMutation } from '@apollo/client';

import getGraphqlError from '../../helpers/getGraphqlError';
import Login from './Login';
import AuthContext from '../../contexts/auth.js';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
        }
    }
`;

const LoginContainer = ({ email, redirect = true, ...props }) => {
    const history = useHistory();
    const location = useLocation();
    const { refetch } = React.useContext(AuthContext);
    const [login, { error, loading }] = useMutation(LOGIN);
    const [values, setValues] = React.useState({
        email: email || '',
        password: '',
    });

    return (
        <>
            <Login
                {...props}
                loading={loading}
                values={values}
                setValues={setValues}
                error={error && getGraphqlError(error)}
                login={() => {
                    login({
                        variables: values,
                    })
                        .then(() => {
                            refetch().then(() => {
                                if (redirect) {
                                    let url = '/';
                                    const query = queryString.parse(
                                        location.search
                                    );

                                    if (query.redirectUrl) {
                                        url = query.redirectUrl;
                                    }

                                    history.push(url);
                                }
                            });
                        })
                        .catch(() => {});
                }}
            />
        </>
    );
};

export default LoginContainer;
