import React from 'react';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import { Link } from 'react-router-dom';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { gql, useQuery } from '@apollo/client';
import {
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import appConfig from '../../../../../../config/app';
import ProductRow from './ProductRow';

const GET_PRODUCTS = gql`
    query GetProductsToClear {
        productsToClear {
            alias
            id
            description
            shortDescription
            originalPrice
            pricing {
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
            isLiquidating
        }
    }
`;

const Products = () => {
    return (
        <Container maxWidth={false}>
            <Grid component={Box} container paddingY={2}>
                <Grid item>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">{appConfig.appName}</Link>
                        <Link to="/products">Produkter</Link>
                        <Typography color="textPrimary">Gamle</Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box}>
                        <DefaultHookQuery
                            queryHookData={useQuery(GET_PRODUCTS)}
                        >
                            {({ data, refetch }) => (
                                <>
                                    <Box padding={2}>
                                        <strong>
                                            Total price of old products:{' '}
                                        </strong>
                                        {formatPrice(
                                            data.productsToClear.reduce(
                                                (total, product) =>
                                                    total +
                                                    product.stock *
                                                        product.pricing
                                                            .originalPrice,
                                                0
                                            )
                                        )}
                                    </Box>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Tittel</TableCell>
                                                <TableCell>Pris</TableCell>
                                                <TableCell>VIP Pris</TableCell>
                                                <TableCell>Open Pris</TableCell>
                                                <TableCell>
                                                    Antall på lager
                                                </TableCell>
                                                <TableCell />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.productsToClear.map(
                                                (product) => (
                                                    <ProductRow
                                                        key={product.id}
                                                        product={product}
                                                        refetch={refetch}
                                                    />
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </>
                            )}
                        </DefaultHookQuery>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Products;
