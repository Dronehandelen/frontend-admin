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
import { Link } from 'react-router-dom';
import OrderRow from './OrderRow.jsx';
import Card from '../../../../../../components/Card.jsx';
import Checkbox from '../../../../../../components/Checkbox/Checkbox.jsx';

const Orders = ({
    orders,
    loadMore,
    loadingMore,
    onlyUnfinished,
    setOnlyUnfinished,
    onlyBackorders,
    setOnlyBackorders,
    refetch,
}) => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Breadcrumb className="pt-3">
                        <BreadcrumbItem>
                            <Link to="/">Dronehandelen</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/ecommerce">Ecommerce</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Ordre</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Row>
                            <Col md={2}>
                                <Checkbox
                                    checked={onlyUnfinished}
                                    toggle={() =>
                                        setOnlyUnfinished(!onlyUnfinished)
                                    }
                                >
                                    Bare uferdige
                                </Checkbox>
                            </Col>
                            <Col md={2}>
                                <Checkbox
                                    checked={onlyBackorders}
                                    toggle={() =>
                                        setOnlyBackorders(!onlyBackorders)
                                    }
                                >
                                    Bare restordre
                                </Checkbox>
                            </Col>
                        </Row>
                        <Table hover className="mt-3">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Total</th>
                                    <th colSpan={2}>Margin</th>
                                    <th>Navn</th>
                                    <th>Dato</th>
                                    <th>Status</th>
                                    <th>Handlinger</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <OrderRow
                                        key={order.id}
                                        order={order}
                                        refetch={refetch}
                                    />
                                ))}
                            </tbody>
                        </Table>
                        {loadMore && (
                            <div className="d-flex justify-content-center">
                                <Button
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                >
                                    {loadingMore ? (
                                        <Spinner />
                                    ) : (
                                        'Last inn flere'
                                    )}
                                </Button>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Orders;
