import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import productQueryFragment from './productQueryFragment.jsx';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';

const QUERY = gql`
    query GetProductForEdit($id: Int!) {
        product(id: $id) {
            ...AdminProductFragment
        }
    }
    ${productQueryFragment}
`;

const ProductLoader = ({ productId, children }) => (
    <DefaultHookQuery
        queryHookData={useQuery(QUERY, {
            variables: {
                id: productId,
            },
            errorPolicy: 'all',
        })}
    >
        {({ data }) => children(data.product)}
    </DefaultHookQuery>
);

export default ProductLoader;
