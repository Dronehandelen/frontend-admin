import React from 'react';
import {
    Alert,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Row,
    Spinner,
    Table,
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
}) => {
    const orderTrackingCode = order.deliveryInfo.bring
        ? order.deliveryInfo.bring.trackingCode
        : '';
    const [trackingCode, setTrackingCode] = React.useState('');
    const [receivedDate, setReceivedDate] = React.useState(
        moment().toISOString()
    );

    React.useEffect(() => setTrackingCode(orderTrackingCode || ''), [
        orderTrackingCode,
    ]);

    const mustBeCaptured =
        [
            orderStatus.WAITING_CONFIRMATION,
            orderStatus.WAITING_BACKORDER_CONFIRMATION,
        ].indexOf(order.status) !== -1;

    return (
        <Order order={order}>
            {({ title, products }) => (
                <Container fluid>
                    <Row>
                        <Col>
                            <Breadcrumb className="pt-3">
                                <BreadcrumbItem>
                                    <Link to="/">{appConfig.appName}</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to="/ecommerce">Ecommerce</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to="/ecommerce/orders">Ordre</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    {order.id}
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col>{title}</Col>
                    </Row>
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
                    <Row className="mt-3">
                        <Col md={4}>
                            <CustomCard>
                                <h3>Timeline</h3>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Hendelse</th>
                                            <th>Dato</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.events.map(
                                            ({ event, happenedAt }, index) => (
                                                <tr key={index}>
                                                    <td>{event}</td>
                                                    <td>
                                                        {date.niceDateTime(
                                                            happenedAt
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
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
                            </CustomCard>
                        </Col>
                        <Col md={8}>
                            <Row>
                                {order.deliveryInfo.bring && (
                                    <>
                                        <Col md={6} className="mb-2">
                                            <Card>
                                                <CardHeader>
                                                    Sporingsnummer
                                                </CardHeader>
                                                <CardBody>
                                                    <p>
                                                        <strong>
                                                            bringPostalOfficeId:{' '}
                                                        </strong>
                                                        {
                                                            order.deliveryInfo
                                                                .bring
                                                                .postalOfficeId
                                                        }
                                                    </p>
                                                    <Form
                                                        onSubmit={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            onSetTrackingCode(
                                                                trackingCode
                                                            );
                                                        }}
                                                    >
                                                        <ManagedFormGroup
                                                            error={
                                                                trackingCodeStatus.error
                                                            }
                                                            inputKey="trackingCode"
                                                        >
                                                            {(errors) => (
                                                                <Input
                                                                    type="text"
                                                                    name="trackingCode"
                                                                    placeholder="Sporingsnummer"
                                                                    value={
                                                                        trackingCode
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setTrackingCode(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    invalid={
                                                                        !!errors
                                                                    }
                                                                />
                                                            )}
                                                        </ManagedFormGroup>
                                                        <Button
                                                            type="submit"
                                                            color="primary"
                                                        >
                                                            Lagre
                                                        </Button>
                                                    </Form>
                                                    {trackingCodeStatus.success && (
                                                        <Alert
                                                            className="mt-2"
                                                            color="success"
                                                        >
                                                            Lagret!
                                                        </Alert>
                                                    )}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
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
                                <Col md={6}>
                                    <Card>
                                        <CardHeader>
                                            Lag nye dokumenter
                                        </CardHeader>
                                        <CardBody>
                                            <Button
                                                color="primary"
                                                onClick={
                                                    onRecreateOrderDocuments
                                                }
                                            >
                                                Lag nye dokumenter
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
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card>
                                        <CardHeader>Leveringsdato</CardHeader>
                                        <CardBody>
                                            <p>
                                                Dato for når kunden mottok
                                                pakken
                                            </p>
                                            {order.packageReceivedAt && (
                                                <p>
                                                    Du har allerede satt dato{' '}
                                                    {Date.niceDateTime(
                                                        order.packageReceivedAt
                                                    )}
                                                </p>
                                            )}
                                            <FormGroup>
                                                <Input
                                                    type="datetime-local"
                                                    value={receivedDate}
                                                    onChange={(e) =>
                                                        setReceivedDate(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </FormGroup>
                                            <Button
                                                color="primary"
                                                onClick={() =>
                                                    onOrderReceivedByCustomer(
                                                        receivedDate
                                                    )
                                                }
                                            >
                                                Sett ny dato
                                            </Button>
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
                                <Col md={6}>
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
