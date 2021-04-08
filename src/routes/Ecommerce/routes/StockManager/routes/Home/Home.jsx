import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';

const Home = ({ suppliers, currentUrl }) => {
    const history = useHistory();

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <Link to="/admin">Admin</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Stock manager</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Leverandør</TableCell>
                                    <TableCell>Totalt</TableCell>
                                    <TableCell>Kategori A</TableCell>
                                    <TableCell>Kategori B</TableCell>
                                    <TableCell>Kategori C</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {suppliers
                                    .sort(
                                        (a, b) =>
                                            b.estimatedLostRevenue.total -
                                            a.estimatedLostRevenue.total
                                    )
                                    .map((supplier) => (
                                        <TableRow
                                            hover
                                            key={supplier.id}
                                            onClick={() =>
                                                history.push(
                                                    currentUrl +
                                                        '/' +
                                                        supplier.id
                                                )
                                            }
                                        >
                                            <TableCell>
                                                {supplier.name}
                                            </TableCell>
                                            <TableCell>
                                                kr{' '}
                                                {formatPrice(
                                                    supplier
                                                        .estimatedLostRevenue
                                                        .total
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                kr{' '}
                                                {formatPrice(
                                                    supplier
                                                        .aEstinatedLostRevenue
                                                        .total
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                kr{' '}
                                                {formatPrice(
                                                    supplier
                                                        .bEstinatedLostRevenue
                                                        .total
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                kr{' '}
                                                {formatPrice(
                                                    supplier
                                                        .cEstinatedLostRevenue
                                                        .total
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
