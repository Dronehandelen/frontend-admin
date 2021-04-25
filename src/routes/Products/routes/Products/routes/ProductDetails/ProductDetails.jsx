import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Row,
    Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Card from '../../../../../../components/Card.jsx';
import ProductEventChart from './productEventChart';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import date from '../../../../../../helpers/date.js';
import EditPromotion from './components/EditPromotion.jsx';
import {
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import appConfig from '../../../../../../config/app';

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
        <Container maxWidth={false}>
            <Grid component={Box} container paddingY={2}>
                <Grid item>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">{appConfig.appName}</Link>
                        <Link to="/products">Produkter</Link>
                        <Typography color="textPrimary">
                            {product.title}
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <h3>{product.title}</h3>
                    <p className="text-muted">{product.shortDescription}</p>
                </Grid>
            </Grid>
            <Grid container className="mt-2" spacing={1}>
                <Grid item md={3}>
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
                </Grid>
                <Grid item md={3}>
                    <Card>
                        <p>
                            <strong>Handlinger</strong>
                        </p>
                        <Link to={editUrl}>Endre</Link>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item md={6}>
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
                </Grid>
                <Grid item md={6}>
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
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
