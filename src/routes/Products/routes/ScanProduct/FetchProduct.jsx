import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Button, Grid } from '@material-ui/core';
import NotFoundActions from './NotFoundActions';
import { Link } from 'react-router-dom';

const GET_PRODUCT = gql`
    query GetProduct($gtin: String) {
        product(gtin: $gtin) {
            id
            title
            shortDescription
            stock
            price
            originalPrice
            primaryImage {
                url
            }
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
        }
    }
`;

const FetchProduct = ({ gtin, match = {} }) => {
    const { data, loading, refetch } = useQuery(GET_PRODUCT, {
        variables: {
            gtin,
        },
    });
    return (
        <Grid component={Box} container paddingY={2}>
            {loading && <Grid item>loading...</Grid>}
            {!loading && !data && (
                <Grid item>
                    <NotFoundActions gtin={gtin} done={refetch} />
                </Grid>
            )}
            {!loading && data && (
                <Grid item>
                    <h1>{data.product.title}</h1>
                    <Box>
                        <Button
                            component={Link}
                            to={`/products/all/${data.product.id}/edit`}
                        >
                            Endre
                        </Button>
                    </Box>
                </Grid>
            )}
        </Grid>
    );
};

export default FetchProduct;
