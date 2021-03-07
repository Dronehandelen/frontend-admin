import React from 'react';
import gql from 'graphql-tag';
import Home from './Home.jsx';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import usePaginatedQuery from '../../../../../../hooks/usePaginatedQuery.js';

const query = gql`
    query GetSupplierOrders($pagination: PaginationInput!) {
        supplierOrders(pagination: $pagination) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                    orderedAt
                    totalPrice
                    supplier {
                        id
                        name
                    }
                    updatedAt
                    createdAt
                }
            }
        }
    }
`;

const HomeContainer = ({ match }) => {
    const [loadingMore, setLoadingMore] = React.useState(false);

    return (
        <DefaultHookQuery
            queryHookData={usePaginatedQuery(query, 'supplierOrders', {})}
        >
            {({ data, fetchMore }) => (
                <Home
                    supplierOrders={data.supplierOrders.edges.map(
                        (e) => e.node
                    )}
                    currentUrl={match.url}
                    fetchMore={
                        fetchMore
                            ? async () => {
                                  setLoadingMore(true);
                                  await fetchMore();
                                  setLoadingMore(false);
                              }
                            : null
                    }
                    loadingMore={loadingMore}
                />
            )}
        </DefaultHookQuery>
    );
};

export default HomeContainer;
