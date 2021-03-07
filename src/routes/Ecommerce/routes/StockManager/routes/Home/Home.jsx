import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import formatPrice from '../../../../../../helpers/formatPrice.js';

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
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Leverandør</th>
                                <th>Estimert tap de neste 60 dagene</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers
                                .sort(
                                    (a, b) =>
                                        b.estimatedLostRevenue.total -
                                        a.estimatedLostRevenue.total
                                )
                                .map((supplier) => (
                                    <tr
                                        key={supplier.id}
                                        onClick={() =>
                                            history.push(
                                                currentUrl + '/' + supplier.id
                                            )
                                        }
                                    >
                                        <td>{supplier.name}</td>
                                        <td>
                                            kr{' '}
                                            {formatPrice(
                                                supplier.estimatedLostRevenue
                                                    .total
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
