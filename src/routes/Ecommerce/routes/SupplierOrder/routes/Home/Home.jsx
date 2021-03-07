import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Container,
    Row,
    Spinner,
    Table,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import date from '../../../../../../helpers/date.js';
import formatPrice from '../../../../../../helpers/formatPrice.js';

const Home = ({ currentUrl, supplierOrders, fetchMore, loadingMore }) => {
    const history = useHistory();
    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/ecommerce">Ecommerce</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Artikler</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Button tag={Link} to={`${currentUrl}/new`} color="primary">
                        Lag ny
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Dato</th>
                                <th>Navn</th>
                                <th>Pris</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplierOrders.map((supplierOrder) => (
                                <tr
                                    key={supplierOrder.id}
                                    onClick={() =>
                                        history.push(
                                            `${currentUrl}/${supplierOrder.id}`
                                        )
                                    }
                                >
                                    <td>
                                        {date.niceDate(supplierOrder.orderedAt)}
                                    </td>
                                    <td>{supplierOrder.supplier.name}</td>
                                    <td>
                                        {formatPrice(supplierOrder.totalPrice)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {fetchMore && (
                        <div className="d-flex justify-content-center">
                            <Button onClick={fetchMore} disabled={loadingMore}>
                                {loadingMore ? <Spinner /> : 'Last inn flere'}
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
