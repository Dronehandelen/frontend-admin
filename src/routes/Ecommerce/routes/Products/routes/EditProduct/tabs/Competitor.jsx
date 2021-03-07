import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Input,
    Row,
} from 'reactstrap';
import formatPrice from '../../../../../../../helpers/formatPrice.js';

const elefunCompetitorId = 1;

const Competitor = ({ product, state, setState }) => {
    const elefunCompetitorReference =
        state.competitorReferences &&
        state.competitorReferences.find(
            (cr) => cr.competitorId === elefunCompetitorId
        );

    const elefunPrice =
        product &&
        product.competitorPrices.find(
            (cp) => cp.competitorId === elefunCompetitorId
        );

    const getOurPriceFromElefun = (elefunPrice) => {
        return Math.round((elefunPrice - 20) / 10) * 10 - 1;
    };

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card>
                        <CardHeader>Elefun product id</CardHeader>
                        <CardBody>
                            <Input
                                type="text"
                                value={
                                    elefunCompetitorReference
                                        ? elefunCompetitorReference.reference
                                        : ''
                                }
                                onChange={(e) => {
                                    let competitorReferences = [
                                        ...state.competitorReferences,
                                    ];
                                    if (e.target.value === '') {
                                        competitorReferences = competitorReferences.filter(
                                            (cr) =>
                                                cr.competitorId !==
                                                elefunCompetitorId
                                        );
                                    } else if (elefunCompetitorReference) {
                                        competitorReferences = competitorReferences.map(
                                            (cr) => {
                                                if (
                                                    cr.competitorId ===
                                                    elefunCompetitorId
                                                ) {
                                                    return {
                                                        ...cr,
                                                        reference:
                                                            e.target.value,
                                                    };
                                                }

                                                return cr;
                                            }
                                        );
                                    } else {
                                        competitorReferences.push({
                                            competitorId: elefunCompetitorId,
                                            reference: e.target.value,
                                        });
                                    }

                                    setState({ competitorReferences });
                                }}
                            />
                        </CardBody>
                    </Card>
                </Col>
                {elefunPrice && (
                    <Col md={4}>
                        <Card>
                            <CardHeader>Elefun price</CardHeader>
                            <CardBody>
                                <h2>{formatPrice(elefunPrice.price)}</h2>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    onClick={() =>
                                        setState({
                                            price: elefunPrice.price,
                                        })
                                    }
                                >
                                    Set
                                </Button>
                                <Button
                                    onClick={() =>
                                        setState({
                                            price: getOurPriceFromElefun(
                                                elefunPrice.price
                                            ),
                                        })
                                    }
                                >
                                    Set{' '}
                                    {getOurPriceFromElefun(elefunPrice.price)}
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Competitor;
