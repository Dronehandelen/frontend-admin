import React from 'react';
import {
    Box,
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
} from '@material-ui/core';
import { Alert, Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery';
import ProductHelper from '../../../../../../helpers/product';
import cn from 'classnames';
import formatPrice from '../../../../../../helpers/formatPrice';

const Brands = ({ match, queryData, filters, setFilters, history }) => {
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
                        <BreadcrumbItem active>Merker</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
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
                                Legg til nytt merke
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
                            </Grid>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Navn</TableCell>
                                    </TableRow>
                                </TableHead>
                                <DefaultHookQuery queryHookData={queryData}>
                                    {({ data, fetchMore }) => (
                                        <>
                                            <TableBody>
                                                {data.brands2.edges
                                                    .map((edge) => edge.node)
                                                    .map((brand) => {
                                                        return (
                                                            <TableRow
                                                                hover
                                                                key={brand.id}
                                                                onClick={() =>
                                                                    history.push(
                                                                        `${match.path}/${brand.id}`
                                                                    )
                                                                }
                                                            >
                                                                <TableCell>
                                                                    {brand.id}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {brand.name}
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

export default Brands;
