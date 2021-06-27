import React from 'react';
import styled from 'styled-components';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import Date from '../helpers/date.js';
import formatPrice from '../helpers/formatPrice.js';
import { getDefaultProductImageUrl } from '../helpers/product.js';

const ImgTdStyled = styled.td`
    width: 100px;

    & > img {
        max-width: 100px;
    }
`;

const TableWrapper = styled.div`
    display: flex;
    justify-content: end;
    text-align: right;
    padding: 10px 0;

    td:first-child {
        padding-right: 100px;
    }
`;

const Order = ({ order, children }) => {
    const details = (
        <Card>
            <CardHeader>
                <strong>Detaljer</strong>
            </CardHeader>
            <CardBody>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Ordrenummer</strong>
                            </td>
                            <td>{order.id}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Dato bestilt</strong>
                            </td>
                            <td>{Date.niceDateTime(order.succeededAt)}</td>
                        </tr>
                        {order.receipt && (
                            <tr>
                                <td>
                                    <strong>Kvittering</strong>
                                </td>
                                <td>
                                    <a
                                        href={order.receipt.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Kvittering
                                    </a>
                                </td>
                            </tr>
                        )}
                        {order.deliveryInfo.trackingUrl && (
                            <tr>
                                <td>
                                    <strong>Sporing</strong>
                                </td>
                                <td>
                                    <a
                                        href={order.deliveryInfo.trackingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Se pakkesporing
                                    </a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );

    const title = <h1>Ordre {order.id}</h1>;

    const delivery = (
        <Card>
            <CardHeader>
                <strong>Levering</strong>
            </CardHeader>
            <CardBody>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Leveringsmåte</strong>
                            </td>
                            <td>
                                <div>{order.deliveryInfo.supplier.name}</div>
                                <div>
                                    {order.deliveryInfo.product &&
                                        order.deliveryInfo.product.name}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Leveringsaddresse</strong>
                            </td>
                            <td>
                                <div>{order.address.address}</div>
                                <div>
                                    {order.address.postalCode}{' '}
                                    {order.address.postalPlace}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Varsling</strong>
                            </td>
                            <td>
                                <div>
                                    {order.firstName} {order.lastName}
                                </div>
                                <div>{order.phone}</div>
                                <div>{order.email}</div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );

    const products = (displayWarehousePlacement = false) => (
        <Card>
            <CardHeader>
                <strong>Varer</strong>
            </CardHeader>
            <CardBody>
                <Table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Vare</th>
                            <th className="text-right">Antall</th>
                            <th className="text-right">Pris</th>
                            <th className="text-right">Totalt</th>
                            {displayWarehousePlacement && (
                                <th className="text-right">Hyllenummer</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderProducts.map(
                            ({ product, price, amount }) => (
                                <tr key={product.id}>
                                    <ImgTdStyled>
                                        <img
                                            src={getDefaultProductImageUrl(
                                                product
                                            )}
                                            alt={product.title}
                                        />
                                    </ImgTdStyled>
                                    <td>{product.title}</td>
                                    <td className="text-right">{amount}</td>
                                    <td className="text-right">
                                        {formatPrice(price)}
                                    </td>
                                    <td className="text-right">
                                        {formatPrice(price * amount)}
                                    </td>
                                    {displayWarehousePlacement && (
                                        <td className="text-right">
                                            {product.warehousePlacement}
                                        </td>
                                    )}
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            </CardBody>
            <CardFooter>
                <TableWrapper>
                    <table>
                        <tbody>
                            <tr>
                                <td>Varer</td>
                                <td className="pl-5">
                                    {formatPrice(
                                        order.totalPrice - order.shippingPrice
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Frakt</td>
                                <td>{formatPrice(order.shippingPrice)}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Totalt</strong>
                                </td>
                                <td>
                                    <strong>
                                        {formatPrice(order.totalPrice)}
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </TableWrapper>
            </CardFooter>
        </Card>
    );

    if (typeof children === 'function') {
        return children({
            title,
            details,
            delivery,
            products,
        });
    }

    return (
        <Container>
            <Row>
                <Col>{title}</Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>{details}</Col>
                <Col md={6}>{delivery}</Col>
            </Row>
            <Row className="mt-2">
                <Col>{products()}</Col>
            </Row>
        </Container>
    );
};

export default Order;
