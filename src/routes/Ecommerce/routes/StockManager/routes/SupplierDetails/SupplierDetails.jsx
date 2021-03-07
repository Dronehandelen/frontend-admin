import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import formatPrice from '../../../../../../helpers/formatPrice.js';

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
                            <Link to="/admin">Admin</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <Link to="/admin/stock-manager">Stock manager</Link>
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
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Produkt id</th>
                                <th>Produktnavn</th>
                                <th>Estimert tap neste 60 dager</th>
                                <th>Antall på lager</th>
                                <th colSpan="2">
                                    Antatt solgte enheter neste 60 dager
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplier.estimatedLostRevenue.perProduct.map(
                                (estimatedLostRevenueForProduct) => (
                                    <tr>
                                        <td>
                                            {
                                                estimatedLostRevenueForProduct
                                                    .product.id
                                            }
                                        </td>
                                        <td>
                                            {
                                                estimatedLostRevenueForProduct
                                                    .product.title
                                            }
                                        </td>
                                        <td>
                                            kr{' '}
                                            {formatPrice(
                                                estimatedLostRevenueForProduct.total
                                            )}
                                        </td>
                                        <td>
                                            {
                                                estimatedLostRevenueForProduct
                                                    .product.stock
                                            }
                                        </td>
                                        <td>
                                            {(
                                                estimatedLostRevenueForProduct.estimatedSalesPerHour *
                                                24 *
                                                60
                                            ).toFixed(2)}
                                        </td>
                                        <td className="text-right">
                                            <Link
                                                to={
                                                    '/ecommerce/products/' +
                                                    estimatedLostRevenueForProduct
                                                        .product.id
                                                }
                                            >
                                                Gå til
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default SupplierDetails;
