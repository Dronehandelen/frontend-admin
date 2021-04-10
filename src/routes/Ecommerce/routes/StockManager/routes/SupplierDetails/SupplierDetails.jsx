import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import {
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Table,
} from '@material-ui/core';

const SupplierDetails = ({ supplier }) => {
    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <Link to="/">Admin</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <Link to="/ecommerce/stock-manager">
                                Stock manager
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{supplier.name}</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>{supplier.name}</h1>
                    <p>
                        <strong>Totalt estimert tap neste 60 dager:</strong> kr{' '}
                        {formatPrice(supplier.estimatedLostRevenue.total)}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produkt id</TableCell>
                                    <TableCell>Produktnavn</TableCell>
                                    <TableCell>ABC Kategori</TableCell>
                                    <TableCell>
                                        Estimert tap neste 60 dager
                                    </TableCell>
                                    <TableCell>Antall på lager</TableCell>
                                    <TableCell colSpan="2">
                                        Antatt solgte enheter neste 60 dager
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {supplier.estimatedLostRevenue.perProduct.map(
                                    (estimatedLostRevenueForProduct) => {
                                        const abcCateogryLabel = estimatedLostRevenueForProduct.product.labels.find(
                                            (label) =>
                                                label.name ===
                                                'SYSTEM_abcAnalysis'
                                        );
                                        return (
                                            <TableRow
                                                hover
                                                key={
                                                    estimatedLostRevenueForProduct
                                                        .product.id
                                                }
                                            >
                                                <TableCell>
                                                    {
                                                        estimatedLostRevenueForProduct
                                                            .product.id
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        estimatedLostRevenueForProduct
                                                            .product.title
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {abcCateogryLabel
                                                        ? abcCateogryLabel.value
                                                        : 'C'}
                                                </TableCell>
                                                <TableCell>
                                                    kr{' '}
                                                    {formatPrice(
                                                        estimatedLostRevenueForProduct.total
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        estimatedLostRevenueForProduct
                                                            .product.stock
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {(
                                                        estimatedLostRevenueForProduct.estimatedSalesPerHour *
                                                        24 *
                                                        60
                                                    ).toFixed(2)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Link
                                                        to={
                                                            '/ecommerce/products/' +
                                                            estimatedLostRevenueForProduct
                                                                .product.id
                                                        }
                                                    >
                                                        Gå til
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default SupplierDetails;
