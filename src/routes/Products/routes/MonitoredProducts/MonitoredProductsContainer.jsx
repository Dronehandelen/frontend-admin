import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql } from '@apollo/client';
import MonitoredProducts from './MonitoredProducts';
import usePaginatedQuery from '../../../../hooks/usePaginatedQuery';

const query = gql`
    query GetMonitoredProducts(
        $filters: ProductFilters
        $pagination: PaginationInput!
        $orderBy: String!
    ) {
        products(
            filters: $filters
            pagination: $pagination
            orderBy: $orderBy
        ) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    alias
                    id
                    description
                    shortDescription
                    originalPrice
                    price
                    title
                    isPublished
                    stock
                    createdAt
                    images {
                        fileId
                        url
                    }
                    primaryImage {
                        fileId
                        url
                    }
                    brand {
                        id
                        name
                    }
                    stars {
                        rating
                        count
                    }
                    competitorPrices {
                        competitorId
                        price
                    }
                    monitoredCount
                }
            }
        }
    }
`;

const MonitoredProductsContainer = ({ match }) => {
    const history = useHistory();
    const queryData = usePaginatedQuery(
        query,
        'products',
        {
            orderBy: 'monitoredCount(DESC)',
        },
        {
            count: 20,
        },
        'monitoredCount(DESC)'
    );

    return <MonitoredProducts queryData={queryData} history={history} />;
};

export default MonitoredProductsContainer;
