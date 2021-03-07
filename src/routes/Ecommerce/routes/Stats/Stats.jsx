import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import moment from 'moment';
import formatPrice from '../../../../helpers/formatPrice.js';
import date from '../../../../helpers/date.js';

const fillEmptyDays = (data, from, to, { zeroFields }) => {
    const date = from.clone().startOf('day');
    const actualTo = to.clone().endOf('day');

    const newData = [];

    while (date.isBefore(actualTo)) {
        const stored = data.find((d) => moment(d.date).isSame(date));

        newData.push(
            zeroFields.reduce(
                (result, field) => {
                    if (result[field] == null) {
                        result[field] = 0;
                    }
                    return result;
                },
                {
                    ...stored,
                    date: date.format('DD. MMM.'),
                }
            )
        );
        date.add(1, 'day');
    }

    return newData;
};

const Stats = ({ currentPeriod, previousPeriod, from, to }) => {
    return (
        <Container>
            <Row>
                <Col md={3} className="mb-3">
                    <Card>
                        <CardHeader>Omsetning</CardHeader>
                        <CardBody>
                            <h1>{formatPrice(currentPeriod.turnover)}</h1>
                            <p>
                                <strong>Forrige: </strong>
                                {formatPrice(previousPeriod.turnover)}
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card>
                        <CardHeader>Antall bestillinger</CardHeader>
                        <CardBody>
                            <h1>{currentPeriod.orderCount}</h1>
                            <p>
                                <strong>Forrige: </strong>
                                {previousPeriod.orderCount}
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card>
                        <CardHeader>User registrations</CardHeader>
                        <CardBody>
                            <h1>{currentPeriod.userRegistrationCount}</h1>
                            <p>
                                <strong>Forrige: </strong>
                                {previousPeriod.userRegistrationCount}
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card>
                        <CardHeader>Unique users</CardHeader>
                        <CardBody>
                            <h1>{currentPeriod.uniqueUsers}</h1>
                            <p>
                                <strong>Forrige: </strong>
                                {previousPeriod.uniqueUsers}
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card>
                        <CardHeader>Unique tracking users</CardHeader>
                        <CardBody>
                            <h1>{currentPeriod.uniqueTrackingUsers}</h1>
                            <p>
                                <strong>Forrige: </strong>
                                {previousPeriod.uniqueTrackingUsers}
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card>
                        <CardHeader>Productvisning i perioden</CardHeader>
                        <CardBody>
                            <h1>{currentPeriod.productEventsCount}</h1>
                            <p>
                                <strong>Forrige: </strong>
                                {previousPeriod.productEventsCount}
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6} className="mb-3">
                    <Card>
                        <CardHeader>Produktvisning per dag</CardHeader>
                        <CardBody>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart
                                    data={fillEmptyDays(
                                        currentPeriod.productViewsCountPerDay,
                                        from,
                                        to,
                                        {
                                            zeroFields: ['count'],
                                        }
                                    )}
                                    margin={{
                                        top: 5,
                                        right: 20,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#387908"
                                        yAxisId={0}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6} className="mb-3">
                    <Card>
                        <CardHeader>Produktklikk per dag</CardHeader>
                        <CardBody>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart
                                    data={fillEmptyDays(
                                        currentPeriod.productClickCountPerDay,
                                        from,
                                        to,
                                        {
                                            zeroFields: ['count'],
                                        }
                                    )}
                                    margin={{
                                        top: 5,
                                        right: 20,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#387908"
                                        yAxisId={0}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-3">
                    <Card>
                        <CardHeader>Mest populære produkter</CardHeader>
                        <CardBody>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Visninger</th>
                                        <th>Navn</th>
                                        <th>Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPeriod.mostPopularProducts.map(
                                        (mpp, index) => (
                                            <tr key={index}>
                                                <td>{mpp.views}</td>
                                                <td>{mpp.product.title}</td>
                                                <td>{mpp.product.id}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6} className="mb-3">
                    <Card>
                        <CardHeader>Siste likes på produktønsker</CardHeader>
                        <CardBody>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Når?</th>
                                        <th>Produktnavn</th>
                                        <th>Bruker</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPeriod.productWishLikes.map(
                                        (pwl, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {date.niceDateTime(
                                                        pwl.likedAt
                                                    )}
                                                </td>
                                                <td>
                                                    {
                                                        pwl.productWish
                                                            .productName
                                                    }
                                                </td>
                                                <td>
                                                    {pwl.user.firstName}{' '}
                                                    {pwl.user.lastName}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Stats;
