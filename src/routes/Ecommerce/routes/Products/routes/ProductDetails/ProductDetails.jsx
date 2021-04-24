import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Card from '../../../../../../components/Card.jsx';
import ProductEventChart from './productEventChart';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import date from '../../../../../../helpers/date.js';
import EditPromotion from './components/EditPromotion.jsx';

const PromotionPrice = ({
    originalPrice,
    promotionPrice,
    name,
    productPromotionMutation,
}) => {
    const [edit, setEdit] = React.useState(false);

    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{promotionPrice && formatPrice(promotionPrice.price)}</td>
                <td>
                    {promotionPrice &&
                        date.niceDateTime(promotionPrice.validUntil)}
                </td>
                <td>
                    {promotionPrice && (
                        <>
                            <Button
                                color="primary"
                                onClick={() => setEdit(true)}
                            >
                                Endre
                            </Button>
                            <Button
                                color="danger"
                                className="ml-1"
                                onClick={() => productPromotionMutation(null)}
                            >
                                Slett
                            </Button>
                        </>
                    )}
                    {!promotionPrice && (
                        <Button color="primary" onClick={() => setEdit(true)}>
                            Lag
                        </Button>
                    )}
                </td>
            </tr>
            <EditPromotion
                value={promotionPrice}
                isOpen={edit}
                onClose={() => setEdit(false)}
                productPromotionMutation={productPromotionMutation}
                originalPrice={originalPrice}
            />
        </>
    );
};

const ProductDetails = ({
    product,
    editUrl,
    from,
    to,
    productPromotionMutation,
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
                        <BreadcrumbItem>
                            <Link to="/ecommerce/products">Products</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{product.title}</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <h3>{product.title}</h3>
                    <p className="text-muted">{product.shortDescription}</p>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={3}>
                    <Card>
                        <table className="w-100">
                            <tbody>
                                <tr>
                                    <th>Total omsetning</th>
                                    <td>
                                        {formatPrice(product.stats.turnover)}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Lagerverdi</th>
                                    <td>
                                        {formatPrice(
                                            product.stats.warehouseValue
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Lager</th>
                                    <td>{product.stock}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <p>
                            <strong>Handlinger</strong>
                        </p>
                        <Link to={editUrl}>Endre</Link>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card>
                        <p>
                            <strong>Tilbud</strong>
                        </p>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Navn</th>
                                    <th>Pris</th>
                                    <th>Gyldig til</th>
                                    <th>Handlinger</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        name: 'VIP',
                                        type: 'vip',
                                        promotionPrice:
                                            product.pricing.vipPromotionPrice,
                                    },
                                    {
                                        name: 'Open',
                                        type: 'open',
                                        promotionPrice:
                                            product.pricing.openPromotionPrice,
                                    },
                                ].map((info) => (
                                    <PromotionPrice
                                        key={info.name}
                                        name={info.name}
                                        promotionPrice={info.promotionPrice}
                                        productPromotionMutation={(
                                            productPromotion
                                        ) =>
                                            productPromotionMutation({
                                                variables: {
                                                    promotion: productPromotion,
                                                    productId: product.id,
                                                    type: info.type,
                                                },
                                            })
                                        }
                                        originalPrice={
                                            product.pricing.originalPrice
                                        }
                                    />
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <p>
                            <strong>Product hendelser siste 30 dager</strong>
                        </p>
                        <ProductEventChart
                            period={product.stats.currentPeriod}
                            from={from}
                            to={to}
                        />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
