import React from 'react';
import Products from './Products.jsx';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'moment-hooks';
import store from 'store';
import usePaginatedQuery from '../../../../../../hooks/usePaginatedQuery.js';

const FEATURE_PRODUCT = gql`
    mutation FeatureProduct($productId: Int!) {
        featureProduct(productId: $productId)
    }
`;

const GET_PRODUCTS = gql`
    query GetProducts(
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
                    isLiquidating
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
                }
            }
        }
    }
`;

const defaultFilters = {
    search: '',
    showOnlyPublished: true,
    showPackages: true,
};

const ProductsContainer = (props) => {
    const history = useHistory();
    const [featureProduct] = useMutation(FEATURE_PRODUCT);
    const [featuredTitle, setFeaturedTitle] = React.useState(null);
    const [filters, setFilters] = React.useState(() => {
        let storageValue;

        try {
            storageValue = JSON.parse(store.get('adminProductsFilters'));
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
            showOnlyPublished: get('showOnlyPublished'),
            showPackages: get('showPackages'),
        };
    });

    React.useEffect(() => {
        store.set('adminProductsFilters', JSON.stringify(filters));
    }, [filters]);

    const debouncedFilters = useDebounce(filters, 500);

    return (
        <Products
            {...props}
            featuredTitle={featuredTitle}
            history={history}
            filters={filters}
            setFilters={(value) => setFilters({ ...filters, ...value })}
            queryData={usePaginatedQuery(
                GET_PRODUCTS,
                'products',
                {
                    filters: {
                        search: debouncedFilters.search,
                        onlyPublished: debouncedFilters.showOnlyPublished,
                        shouldShowPackages: debouncedFilters.showPackages,
                    },
                },
                {
                    count: 20,
                },
                debouncedFilters.search.length === 0 ? 'id' : 'searchRank'
            )}
            featureProduct={async (productId, productTitle) => {
                await featureProduct({
                    variables: {
                        productId,
                    },
                });
                setFeaturedTitle(productTitle);
            }}
        />
    );
};

export default ProductsContainer;
