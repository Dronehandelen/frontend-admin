import React from 'react';
import {
    Alert,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Row,
    Spinner,
} from 'reactstrap';
import ManagedFormGroup from '../../../../../../components/ManagedFormGroup';
import Order from '../../../../../../components/Order';
import DeliveryPicker from '../../../../../../components/DeliveryPicker';
import moment from 'moment';
import Date from '../../../../../../helpers/date.js';
import { Link } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import CustomCard from '../../../../../../components/Card';
import orderStatus from '../../../../../../constants/orderStatus.js';
import date from '../../../../../../helpers/date.js';
import CompleteBackorder from './CompleteBackorder.jsx';
import {
    Box,
    Breadcrumbs,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';

const OrderDetails = ({
    order,
    trackingCodeStatus,
    onSetTrackingCode,
    bookOrderDeliveryStatus,
    onBookOrderDelivery,
    sendOrderTrackingEmailStatus,
    onSendOrderTrackingEmail,
    recreateOrderDocumentsStatus,
    onRecreateOrderDocuments,
    orderReceivedByCustomerStatus,
    onOrderReceivedByCustomer,
    onCaptureOrderFunds,
    captureOrderFundsStatus,
    onCompleteBackorder,
    completeBackorderStatus,
    refundOrderStatus,
    onRefundOrder,
}) => {
    const orderTrackingCode = order.deliveryInfo.bring
        ? order.deliveryInfo.bring.trackingCode
        : '';
    const [trackingCode, setTrackingCode] = React.useState('');

    React.useEffect(
        () => setTrackingCode(orderTrackingCode || ''),
        [orderTrackingCode]
    );

    const mustBeCaptured =
        [
            orderStatus.WAITING_CONFIRMATION,
            orderStatus.WAITING_BACKORDER_CONFIRMATION,
        ].indexOf(order.status) !== -1;

    const showRefund =
        [
            orderStatus.WAITING_CONFIRMATION,
            orderStatus.WAITING_BACKORDER_CONFIRMATION,
        ].indexOf(order.status) !== -1;

    return (
        <Order order={order}>
            {({ title, products }) => (
                <Container maxWidth={false}>
                    <Grid container>
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link to="/">{appConfig.appName}</Link>
                                <Link to="/ecommerce">Ecommerce</Link>
                                <Link to="/ecommerce/orders">Ordre</Link>
                                <Typography color="textPrimary">
                                    {order.id}
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Box marginTop={2}>{title}</Box>
                        </Grid>
                    </Grid>
                    <Row className="mt-3">
                        <Col md={6}>
                            <CustomCard>
                                <h3>Detaljer</h3>
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
                                            <td>
                                                {Date.niceDateTime(
                                                    order.succeededAt
                                                )}
                                            </td>
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
                                        {order.packingList && (
                                            <tr>
                                                <td>
                                                    <strong>Pakkeliste</strong>
                                                </td>
                                                <td>
                                                    <a
                                                        href={
                                                            order.packingList
                                                                .url
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Pakkeliste
                                                    </a>
                                                </td>
                                            </tr>
                                        )}
                                        {order.deliveryInfo.bring &&
                                            order.deliveryInfo.bring
                                                .trackingCode && (
                                                <tr>
                                                    <td>
                                                        <strong>Sporing</strong>
                                                    </td>
                                                    <td>
                                                        <a
                                                            href={`https://sporing.posten.no/sporing/${order.deliveryInfo.bring.trackingCode}`}
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
                            </CustomCard>
                        </Col>
                        <Col md={6}>
                            <CustomCard>
                                <h3>Levering</h3>
                                <Table borderless>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>Leveringsmåte</strong>
                                            </td>
                                            <td>
                                                <div>
                                                    {
                                                        order.deliveryInfo
                                                            .deliveryTypeInfo
                                                            .name
                                                    }
                                                </div>
                                                <div>
                                                    {order.deliveryInfo.bring &&
                                                        order.deliveryInfo.bring
                                                            .typeInfo.name}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>
                                                    Leveringsaddresse
                                                </strong>
                                            </td>
                                            <td>
                                                <div>
                                                    {order.address.address}
                                                </div>
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
                                                    {order.firstName}{' '}
                                                    {order.lastName}
                                                </div>
                                                <div>{order.phone}</div>
                                                <div>{order.email}</div>
                                            </td>
                                        </tr>
                                        {order.deliveryInfo.bring &&
                                            order.deliveryInfo.bring
                                                .trackingCode && (
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Sporingsnummer
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            {
                                                                order
                                                                    .deliveryInfo
                                                                    .bring
                                                                    .trackingCode
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        {order.deliveryInfo.bring &&
                                            order.deliveryInfo.bring
                                                .shippingLabel && (
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Sendingsetikett
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <a
                                                                href={
                                                                    order
                                                                        .deliveryInfo
                                                                        .bring
                                                                        .shippingLabel
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Etikett
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                    </tbody>
                                </Table>
                            </CustomCard>
                        </Col>
                    </Row>
                    <Grid container spacing={1}>
                        <Grid item md={4}>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Hendelse</TableCell>
                                            <TableCell>Dato</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.events.map(
                                            ({ event, happenedAt }, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {event}
                                                    </TableCell>
                                                    <TableCell>
                                                        {date.niceDateTime(
                                                            happenedAt
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                                {order.status ===
                                    orderStatus.WAITING_FOR_BACKORDER_PRODUCTS && (
                                    <CompleteBackorder
                                        completeBackorderStatus={
                                            completeBackorderStatus
                                        }
                                        onCompleteBackorder={
                                            onCompleteBackorder
                                        }
                                    />
                                )}
                            </Paper>
                        </Grid>
                        <Grid item md={8}>
                            <Paper component={Box}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Navn</TableCell>
                                            <TableCell colSpan={2}>
                                                Beskrivelse
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {showRefund && (
                                            <TableRow>
                                                <TableCell>Avbestill</TableCell>
                                                <TableCell>
                                                    Tilbakebetaler hele beløpet
                                                    og bestillingen får status
                                                    kansellert. MERK: Husk å
                                                    oppdater varelager
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            onRefundOrder();
                                                        }}
                                                    >
                                                        {refundOrderStatus.loading ? (
                                                            <CircularProgress />
                                                        ) : (
                                                            'Avbestill'
                                                        )}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        <TableRow>
                                            <TableCell>
                                                Lag nye dokumenter
                                            </TableCell>
                                            <TableCell />
                                            <TableCell width="250">
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={
                                                        onRecreateOrderDocuments
                                                    }
                                                >
                                                    {recreateOrderDocumentsStatus.loading ? (
                                                        <CircularProgress />
                                                    ) : (
                                                        'Lag nye dokumenter'
                                                    )}
                                                </Button>
                                                {recreateOrderDocumentsStatus.success && (
                                                    <Alert
                                                        className="mt-2"
                                                        color="success"
                                                    >
                                                        Ferdig!
                                                    </Alert>
                                                )}
                                                {recreateOrderDocumentsStatus.error && (
                                                    <Alert
                                                        className="mt-2"
                                                        color="danger"
                                                    >
                                                        Noe skjedde!
                                                    </Alert>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Row className="mt-3">
                        <Col md={12}>
                            <Row>
                                {order.deliveryInfo.bring && (
                                    <>
                                        <Col md={4}>
                                            <Card>
                                                <CardHeader>
                                                    Send sporing e-post
                                                </CardHeader>
                                                <CardBody>
                                                    {!order.deliveryInfo.bring
                                                        .trackingCode && (
                                                        <p>
                                                            Du må få et
                                                            sporingsnummer før
                                                            du kan sende e-post
                                                        </p>
                                                    )}
                                                    {order.shippingEmailSentAt && (
                                                        <p>
                                                            Du har allerede
                                                            sendt en e-post
                                                        </p>
                                                    )}
                                                    {order.deliveryInfo.bring
                                                        .trackingCode && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={
                                                                onSendOrderTrackingEmail
                                                            }
                                                        >
                                                            Send
                                                        </Button>
                                                    )}
                                                    {sendOrderTrackingEmailStatus.success && (
                                                        <Alert
                                                            className="mt-2"
                                                            color="success"
                                                        >
                                                            Sendt!
                                                        </Alert>
                                                    )}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </>
                                )}
                                <Col md={4}>
                                    <Card>
                                        <CardHeader>Leveringsdato</CardHeader>
                                        <CardBody>
                                            {order.packageReceivedAt && (
                                                <p>
                                                    Du har allerede satt dato{' '}
                                                    {Date.niceDateTime(
                                                        order.packageReceivedAt
                                                    )}
                                                </p>
                                            )}
                                            <FormGroup>
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        onOrderReceivedByCustomer(
                                                            moment().toISOString()
                                                        )
                                                    }
                                                >
                                                    Marker som motatt
                                                </Button>
                                            </FormGroup>
                                            {orderReceivedByCustomerStatus.success && (
                                                <Alert
                                                    className="mt-2"
                                                    color="success"
                                                >
                                                    Ferdig!
                                                </Alert>
                                            )}
                                            {orderReceivedByCustomerStatus.error && (
                                                <Alert
                                                    className="mt-2"
                                                    color="danger"
                                                >
                                                    Noe skjedde!
                                                </Alert>
                                            )}
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card
                                        color={
                                            mustBeCaptured
                                                ? 'danger'
                                                : 'success'
                                        }
                                    >
                                        <CardHeader>Capture funds</CardHeader>
                                        <CardBody>
                                            {order.status ===
                                                orderStatus.DONE && 'All good'}
                                            {mustBeCaptured && (
                                                <>
                                                    <p>
                                                        Etter at du har sjekket
                                                        at alle varene er på
                                                        lager må du trykke på
                                                        "capture" slik at kortet
                                                        blir belastet.
                                                    </p>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() =>
                                                            onCaptureOrderFunds()
                                                        }
                                                    >
                                                        {captureOrderFundsStatus.loading ? (
                                                            <Spinner />
                                                        ) : (
                                                            'Capture'
                                                        )}
                                                    </Button>
                                                </>
                                            )}
                                            {captureOrderFundsStatus.success && (
                                                <Alert
                                                    className="mt-2"
                                                    color="success"
                                                >
                                                    Ferdig!
                                                </Alert>
                                            )}
                                            {captureOrderFundsStatus.error && (
                                                <Alert
                                                    className="mt-2"
                                                    color="danger"
                                                >
                                                    Noe skjedde!
                                                </Alert>
                                            )}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {[
                        appConfig.deliveryTypes.BRING,
                        appConfig.deliveryTypes.BRING_SP,
                        appConfig.deliveryTypes.BRING_PIP,
                    ].indexOf(order.deliveryType) !== -1 &&
                        order.deliveryInfo.bring && (
                            <Row className="mt-2">
                                <Col md={12}>
                                    <DeliveryPicker
                                        order={order}
                                        deliveryInfo={order.deliveryInfo.bring}
                                        onOrder={onBookOrderDelivery}
                                        status={bookOrderDeliveryStatus}
                                    />
                                </Col>
                            </Row>
                        )}

                    <Row className="mt-2">
                        <Col>{products(true)}</Col>
                    </Row>
                </Container>
            )}
        </Order>
    );
};

export default OrderDetails;
