import React from 'react';
import { gql } from '@apollo/client';
import usePaginatedQuery from '../../../../../../hooks/usePaginatedQuery';
import Brands from './Brands';
import { useHistory } from 'react-router-dom';
import store from 'store';

const query = gql`
    query GetBrands($filters: BrandFilters, $pagination: PaginationInput!) {
        brands2(filters: $filters, pagination: $pagination) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;

const defaultFilters = {
    search: '',
};

const BrandsContainer = (props) => {
    const history = useHistory();
    const [filters, setFilters] = React.useState(() => {
        let storageValue;

        try {
            storageValue = JSON.parse(store.get('adminBrandsFilters'));
        } catch (e) {}

        const filters = storageValue || defaultFilters;

        const get = (name) => {
            const value = filters[name];
            if (value !== undefined) {
                return value;
            }

            return defaultFilters[name];
        };

        return {
            search: get('search'),
        };
    });

    React.useEffect(() => {
        store.set('adminBrandsFilters', JSON.stringify(filters));
    }, [filters]);

    return (
        <Brands
            {...props}
            queryData={usePaginatedQuery(
                query,
                'brands2',
                {
                    filters,
                },
                {
                    count: 10,
                }
            )}
            history={history}
            filters={filters}
            setFilters={setFilters}
        >
            adsf
        </Brands>
    );
};

export default BrandsContainer;
