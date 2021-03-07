import React from 'react';
import Orders from './Orders.jsx';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import gql from 'graphql-tag';
import usePaginatedQuery from '../../../../../../hooks/usePaginatedQuery.js';

const GET_ORDERS = gql`
    query GetOrders($filters: OrderFilters, $pagination: PaginationInput!) {
        orders(filters: $filters, pagination: $pagination) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                    status
                    firstName
                    lastName
                    totalPriceWithoutShippingAndTaxes
                    estimatedMargin
                    numberOfProductsMissingForEstimation
                    succeededAt
                    packageReceivedAt
                    paymentMethod
                    createdAt
                    shippingEmailSentAt
                    deliveryType
                    deliveryInfo {
                        bring {
                            type
                            postalOfficeId
                            trackingCode
                            shippingLabel
                        }
                    }
                }
            }
        }
    }
`;

const OrdersContainer = (props) => {
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [onlyUnfinished, setOnlyUnfinished] = React.useState(true);
    const [onlyBackorders, setOnlyBackorders] = React.useState(false);

    return (
        <DefaultHookQuery
            queryHookData={usePaginatedQuery(GET_ORDERS, 'orders', {
                filters: {
                    onlyUnfinished,
                    onlyBackorders,
                },
            })}
        >
            {({ data, fetchMore, refetch }) => (
                <Orders
                    {...props}
                    orders={data.orders.edges.map((e) => e.node)}
                    loadMore={
                        fetchMore
                            ? async () => {
                                  setLoadingMore(true);
                                  await fetchMore();
                                  setLoadingMore(false);
                              }
                            : null
                    }
                    loadingMore={loadingMore}
                    onlyUnfinished={onlyUnfinished}
                    setOnlyUnfinished={setOnlyUnfinished}
                    onlyBackorders={onlyBackorders}
                    setOnlyBackorders={setOnlyBackorders}
                    refetch={refetch}
                />
            )}
        </DefaultHookQuery>
    );
};

export default OrdersContainer;
