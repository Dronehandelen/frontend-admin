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

const ProductsContainer = (props) => {
    const history = useHistory();
    const [featureProduct] = useMutation(FEATURE_PRODUCT);
    const [featuredTitle, setFeaturedTitle] = React.useState(null);
    const [search, setSearch] = React.useState(() => {
        return store.get('adminProductsFilters_search') || '';
    });
    const debouncedSearch = useDebounce(search, 500);

    React.useEffect(() => {
        store.set('adminProductsFilters_search', search);
    }, [search]);

    return (
        <Products
            {...props}
            search={search}
            setSearch={setSearch}
            debouncedSearch={debouncedSearch}
            featuredTitle={featuredTitle}
            history={history}
            queryData={usePaginatedQuery(
                GET_PRODUCTS,
                'products',
                {
                    filters: {
                        onlyPublished: false,
                        search: debouncedSearch,
                        shouldShowPackages: true,
                    },
                },
                {
                    count: 20,
                },
                debouncedSearch.length === 0 ? 'id' : 'searchRank'
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
