import React from 'react';
import { Link } from 'react-router-dom';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import {
    Box,
    Breadcrumbs,
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
    Typography,
} from '@material-ui/core';
import appConfig from '../../../../config/app';

const Products = ({ queryData, history }) => {
    return (
        <Container maxWidth={false}>
            <Grid component={Box} container paddingY={2}>
                <Grid item>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">{appConfig.appName}</Link>
                        <Link to="/products">Produkter</Link>
                        <Typography color="textPrimary">Overvåket</Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Paper component={Box}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tittel</TableCell>
                                        <TableCell>Antall overvåking</TableCell>
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
                                                                        `/products/all/${product.id}`
                                                                    )
                                                                }
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        product.title
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        product.monitoredCount
                                                                    }
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
