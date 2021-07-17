import React from 'react';
import gql from 'graphql-tag';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery';
import { useQuery } from '@apollo/client';
import Navigator from './Navigator';

const GET_ORDERS = gql`
    query GetOrders($filters: OrderFilters, $pagination: PaginationInput!) {
        orders(
            filters: $filters
            pagination: $pagination
            orderBy: "createdAt(desc)"
        ) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                }
            }
        }
    }
`;

const OrderCheckContainer = () => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(GET_ORDERS, {
                variables: {
                    filters: {
                        onlyMustBeChecked: true,
                        onlyUnfinished: false,
                    },
                    pagination: {
                        count: 100,
                    },
                },
            })}
        >
            {({ data, refetch }) => (
                <Navigator
                    orders={data.orders.edges.map((e) => e.node)}
                    refetch={refetch}
                />
            )}
        </DefaultHookQuery>
    );
};

export default OrderCheckContainer;
