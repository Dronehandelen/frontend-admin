import React from 'react';
import { Alert } from 'reactstrap';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import { Link } from 'react-router-dom';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import {
    Box,
    Breadcrumbs,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import appConfig from '../../../../../../config/app';
import LiquidateButton from '../../../../../../components/LiquidateButton';

const Products = ({
    match,
    queryData,
    filters,
    setFilters,
    featureProduct,
    featuredTitle,
    history,
}) => {
    return (
        <Container maxWidth={false}>
            <Grid component={Box} container paddingY={2}>
                <Grid item>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">{appConfig.appName}</Link>
                        <Link to="/products">Produkter</Link>
                        <Typography color="textPrimary">Alle</Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box}>
                        <Box padding={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                component={Link}
                                to={`${match.path}/new`}
                            >
                                Legg til ny produkt
                            </Button>
                        </Box>
                        <Box padding={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Søk"
                                        className="w-100"
                                        value={filters.search}
                                        onChange={(e) =>
                                            setFilters({
                                                search: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    filters.showOnlyPublished
                                                }
                                                onChange={() =>
                                                    setFilters({
                                                        showOnlyPublished:
                                                            !filters.showOnlyPublished,
                                                    })
                                                }
                                                inputProps={{
                                                    'aria-label':
                                                        'primary checkbox',
                                                }}
                                            />
                                        }
                                        label="Vis kun publiserte"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filters.showPackages}
                                                onChange={() =>
                                                    setFilters({
                                                        showPackages:
                                                            !filters.showPackages,
                                                    })
                                                }
                                                inputProps={{
                                                    'aria-label':
                                                        'primary checkbox',
                                                }}
                                            />
                                        }
                                        label="Vis pakker"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        {featuredTitle && (
                            <Box marginBottom={2} padding={2}>
                                <Alert color="success">
                                    Successfully featured {featuredTitle}
                                </Alert>
                            </Box>
                        )}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Tittel</TableCell>
                                        <TableCell>Plasering</TableCell>
                                        <TableCell>Pris</TableCell>
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
                                                        return (
                                                            <TableRow
                                                                hover
                                                                key={product.id}
                                                                onClick={() =>
                                                                    history.push(
                                                                        `${match.path}/${product.id}`
                                                                    )
                                                                }
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                <TableCell>
                                                                    <img
                                                                        style={{
                                                                            maxHeight: 50,
                                                                        }}
                                                                        src={
                                                                            product
                                                                                .primaryImage
                                                                                .url
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        product.title
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        product.warehousePlacement
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {formatPrice(
                                                                        product.price
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
                                                                        className="mr-1"
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
                                                                    <LiquidateButton
                                                                        productId={
                                                                            product.id
                                                                        }
                                                                        show={
                                                                            !product.isLiquidating
                                                                        }
                                                                        size="small"
                                                                    />
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
