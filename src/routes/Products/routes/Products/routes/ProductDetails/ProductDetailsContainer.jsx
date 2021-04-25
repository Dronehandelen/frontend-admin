import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import ProductDetails from './ProductDetails.jsx';
import moment from 'moment';
import { productEventChartFragment } from './productEventChart.jsx';

const GET_PRODUCT = gql`
    query GetProduct($id: Int!, $from: DateTime!, $to: DateTime!) {
        product(id: $id) {
            id
            title
            shortDescription
            stock
            pricing {
                price
                originalPrice
                vipPromotionPrice: promotionPrice(type: "vip") {
                    validUntil
                    price
                }
                openPromotionPrice: promotionPrice(type: "open") {
                    validUntil
                    price
                }
            }
            stats {
                turnover
                warehouseValue
                currentPeriod: period(from: $from, to: $to) {
                    ...ProductEventChartData
                }
            }
        }
    }
    ${productEventChartFragment}
`;

const MUTATION = gql`
    mutation ProductPromotion(
        $productId: Int!
        $type: String!
        $promotion: ProductPromotionInput
    ) {
        productPromotion(
            productId: $productId
            type: $type
            promotion: $promotion
        )
    }
`;

const ProductDetailsContainer = ({ match }) => {
    const to = moment().endOf('day');
    const from = moment().subtract(31, 'days').endOf('day');
    const [_productPromotionMutation] = useMutation(MUTATION, {
        refetchQueries: ['GetProduct'],
    });

    return (
        <DefaultHookQuery
            queryHookData={useQuery(GET_PRODUCT, {
                variables: {
                    id: parseInt(match.params.productId),
                    from,
                    to,
                },
            })}
        >
            {({ data, refetch }) => (
                <ProductDetails
                    product={data.product}
                    editUrl={match.url + '/edit'}
                    from={from}
                    to={to}
                    productPromotionMutation={_productPromotionMutation}
                />
            )}
        </DefaultHookQuery>
    );
};

export default ProductDetailsContainer;
