import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Card from '../../../../components/Card.jsx';
import TotalTurnover from './TotalTurnover.jsx';
import LastReviews from './LastReviews.jsx';
import WarehouseValue from './WarehouseValue.jsx';
import LastAddToCart from './LastAddToCart.jsx';
import ProductEventChart from './productEventChart.jsx';
import TotalMargin from './TotalMargin.jsx';

const Home = ({ data, from, to }) => {
    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={4}>
                    <TotalTurnover stats={data.stats} />
                </Col>
                <Col md={4}>
                    <WarehouseValue stats={data.stats} />
                </Col>
                <Col md={4}>
                    <TotalMargin period={data.stats.currentPeriod} />
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <Card>
                        <p>
                            <strong>Product hendelser siste 30 dager</strong>
                        </p>
                        <ProductEventChart
                            period={data.stats.currentPeriod}
                            from={from}
                            to={to}
                        />
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <p>
                            <strong>Siste anmeldelser</strong>
                        </p>
                        <LastReviews reviews={data.lastReviews} />
                    </Card>
                    <Card>
                        <p>
                            <strong>Siste lagt til handlevogn</strong>
                        </p>
                        <LastAddToCart stats={data.stats} />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
