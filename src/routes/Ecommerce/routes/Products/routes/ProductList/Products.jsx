import React from 'react';
import cn from 'classnames';
import { Alert, Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import ProductHelper from '../../../../../../helpers/product.js';
import { Link } from 'react-router-dom';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@material-ui/core';

const Products = ({
    match,
    queryData,
    search,
    setSearch,
    featureProduct,
    featuredTitle,
    history,
}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumb className="pt-3">
                        <BreadcrumbItem>
                            <Link to="/">Dronehandelen</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/ecommerce">Ecommerce</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Produkter</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box}>
                        <Box padding={2}>
                            <Box marginBottom={2}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="mb-2"
                                    tag={Link}
                                    to={`${match.path}/new`}
                                >
                                    Legg til ny produkt
                                </Button>
                            </Box>
                            <Box marginBottom={2}>
                                <TextField
                                    label="Søk"
                                    className="w-100"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {featuredTitle && (
                                    <Alert color="success">
                                        Successfully featured {featuredTitle}
                                    </Alert>
                                )}
                            </Box>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tittel</TableCell>
                                        <TableCell>Pris</TableCell>
                                        <TableCell>Pris på tilbud</TableCell>
                                        <TableCell>Elefun pris</TableCell>
                                        <TableCell>Publisert</TableCell>
                                        <TableCell>Antall på lager</TableCell>
                                        <TableCell>Jobber</TableCell>
                                    </TableRow>
                                </TableHead>
                                <DefaultHookQuery queryHookData={queryData}>
                                    {({ data, fetchMore }) => (
                                        <>
                                            <TableBody>
                                                {data.products.edges
                                                    .map((edge) => edge.node)
                                                    .map((product) => {
                                                        const wrappedProduct = ProductHelper(
                                                            product
                                                        );
                                                        const expectedPrice = wrappedProduct.expectedPriceBasedOnCompetitors();
                                                        const elefunPrice = wrappedProduct.competitorPrice(
                                                            1
                                                        );

                                                        const isUnexpectedPrice =
                                                            expectedPrice &&
                                                            expectedPrice !==
                                                                product.originalPrice;

                                                        const isExpectedPrice =
                                                            expectedPrice &&
                                                            expectedPrice ===
                                                                product.originalPrice;

                                                        return (
                                                            <TableRow
                                                                hover
                                                                key={product.id}
                                                                onClick={() =>
                                                                    history.push(
                                                                        `${match.path}/${product.id}`
                                                                    )
                                                                }
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        product.title
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    <span
                                                                        className={cn(
                                                                            {
                                                                                'text-danger': isUnexpectedPrice,
                                                                                'text-success': isExpectedPrice,
                                                                            }
                                                                        )}
                                                                    >
                                                                        {formatPrice(
                                                                            product.originalPrice
                                                                        )}
                                                                        {isUnexpectedPrice && (
                                                                            <span>
                                                                                (
                                                                                {formatPrice(
                                                                                    expectedPrice
                                                                                )}

                                                                                )
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.originalPrice !==
                                                                        product.price &&
                                                                        formatPrice(
                                                                            product.price
                                                                        )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {elefunPrice &&
                                                                        formatPrice(
                                                                            elefunPrice
                                                                        )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.isPublished
                                                                        ? 'Ja'
                                                                        : 'Nei'}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        product.stock
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        color="primary"
                                                                        className="mr-1"
                                                                        size="small"
                                                                        variant="contained"
                                                                        tag={
                                                                            Link
                                                                        }
                                                                        to={`${match.path}/${product.id}`}
                                                                    >
                                                                        Endre
                                                                    </Button>
                                                                    <Button
                                                                        color="primary"
                                                                        size="small"
                                                                        variant="contained"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            e.preventDefault();
                                                                            featureProduct(
                                                                                product.id,
                                                                                product.title
                                                                            );
                                                                        }}
                                                                    >
                                                                        Feature
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {fetchMore && (
                                                    <TableRow>
                                                        <TableCell
                                                            colspan={100}
                                                        >
                                                            <Box
                                                                display="flex"
                                                                justifyContent="center"
                                                            >
                                                                <Button
                                                                    color="primary"
                                                                    variant="contained"
                                                                    onClick={() =>
                                                                        fetchMore()
                                                                    }
                                                                >
                                                                    Last inn
                                                                    flere
                                                                </Button>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </>
                                    )}
                                </DefaultHookQuery>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Products;
