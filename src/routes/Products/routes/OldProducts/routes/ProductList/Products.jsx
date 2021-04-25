import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import { Link, useHistory } from 'react-router-dom';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { gql, useQuery } from '@apollo/client';
import Card from '../../../../../../components/Card.jsx';

const GET_PRODUCTS = gql`
    query GetProductsToClear {
        productsToClear {
            alias
            id
            description
            shortDescription
            originalPrice
            pricing {
                originalPrice
                vipPromotionPrice: promotionPrice(type: "vip") {
                    validUntil
                    price
                }
                openPromotionPrice: promotionPrice(type: "open") {
                    validUntil
                    price
                }
            }
            title
            isPublished
            stock
            createdAt
            images {
                fileId
                url
            }
            primaryImage {
                fileId
                url
            }
            brand {
                id
                name
            }
            stars {
                rating
                count
            }
            competitorPrices {
                competitorId
                price
            }
        }
    }
`;

const Products = ({ match }) => {
    const history = useHistory();

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
                        <BreadcrumbItem active>Produkter</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <DefaultHookQuery
                            queryHookData={useQuery(GET_PRODUCTS)}
                        >
                            {({ data }) => (
                                <>
                                    <div className="mb-3">
                                        <strong>
                                            Total price of old products:{' '}
                                        </strong>
                                        {formatPrice(
                                            data.productsToClear.reduce(
                                                (total, product) =>
                                                    total +
                                                    product.stock *
                                                        product.pricing
                                                            .originalPrice,
                                                0
                                            )
                                        )}
                                    </div>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Tittel</th>
                                                <th>Pris</th>
                                                <th>VIP Pris</th>
                                                <th>Open Pris</th>
                                                <th>Antall på lager</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.productsToClear.map(
                                                (product) => (
                                                    <tr
                                                        key={product.id}
                                                        onClick={() =>
                                                            history.push(
                                                                `/products/all/${product.id}`
                                                            )
                                                        }
                                                    >
                                                        <td>{product.title}</td>
                                                        <td>
                                                            {formatPrice(
                                                                product.pricing
                                                                    .originalPrice
                                                            )}
                                                        </td>
                                                        <td>
                                                            {product.pricing
                                                                .vipPromotionPrice &&
                                                                formatPrice(
                                                                    product
                                                                        .pricing
                                                                        .vipPromotionPrice
                                                                        .price
                                                                )}
                                                        </td>
                                                        <td>
                                                            {product.pricing
                                                                .openPromotionPrice &&
                                                                formatPrice(
                                                                    product
                                                                        .pricing
                                                                        .openPromotionPrice
                                                                        .price
                                                                )}
                                                        </td>
                                                        <td>{product.stock}</td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </Table>
                                </>
                            )}
                        </DefaultHookQuery>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;
