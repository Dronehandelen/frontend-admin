import * as React from 'react';
import { Alert, Spinner } from 'reactstrap';
import getGraphqlError from '../helpers/getGraphqlError.js';
import NotFound from '../components/NotFound.jsx';

const DefaultHookQuery = ({
    children,
    queryHookData,
    backgroundUpdate = false,
    handleNotFound = false,
}) => {
    const { loading, error, ...dataProps } = queryHookData;

    if (
        loading &&
        (!backgroundUpdate ||
            dataProps.data == null ||
            Object.keys(dataProps.data).length === 0)
    ) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner />
            </div>
        );
    }

    if (error) {
        const parsedError = getGraphqlError(error);

        if (handleNotFound && parsedError.type === 'not_found') {
            return <NotFound />;
        }

        return <Alert color="danger">Something happened</Alert>;
    }

    return children(dataProps);
};

export default DefaultHookQuery;
