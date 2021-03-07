import React from 'react';
import gql from 'graphql-tag';
import ProductBlock from './ProductBlock.jsx';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import { useQuery } from '@apollo/client';

export const getProductQuery = gql`
    query GetProduct($id: Int, $alias: String) {
        product(id: $id, alias: $alias) {
            alias
            id
            type
            description
            shortDescription
            expiredAt
            pricing {
                originalPrice
                price
                vipPromotionPrice: promotionPrice(type: "vip") {
                    validUntil
                    price
                }
                openPromotionPrice: promotionPrice(type: "open") {
                    validUntil
                    price
                }
            }
            originalPrice
            price
            title
            stock
            countAvailableForBackorder
            backorderMessage
            createdAt
            images {
                fileId
                url
            }
            primaryImage {
                fileId
                url
            }
            stars {
                rating
                count
            }
        }
    }
`;

const ProductBlockContainer = ({ productId }) => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(getProductQuery, {
                variables: {
                    id: productId,
                },
                errorPolicy: 'all',
            })}
            handleNotFound
        >
            {({ data }) => {
                if (!data.product) {
                    return <React.Fragment />;
                }

                return <ProductBlock product={data.product} />;
            }}
        </DefaultHookQuery>
    );
};

export default ProductBlockContainer;
