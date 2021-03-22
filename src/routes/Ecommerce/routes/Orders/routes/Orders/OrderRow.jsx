import React from 'react';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import Date from '../../../../../../helpers/date.js';
import getOrderStatus from './getOrderStatus.js';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import mutationRequest from '../../../../../../helpers/mutationRequest.js';
import { gql, useMutation } from '@apollo/client';
import moment from 'moment';

const CAPTURE_ORDER_FUNDS = gql`
    mutation CaptureOrderFunds($orderId: Int!) {
        captureOrderFunds(orderId: $orderId) {
            id
        }
    }
`;

const SEND_ORDER_TRACKING_EMAIL = gql`
    mutation SendOrderTrackingEmail($orderId: Int!) {
        sendOrderTrackingEmail(orderId: $orderId) {
            id
            shippingEmailSentAt
        }
    }
`;

const ORDER_RECEIVED_BY_CUSTOMER_MUTATION = gql`
    mutation OrderReceivedByCustomer($orderId: Int!, $date: DateTime!) {
        orderReceivedByCustomer(orderId: $orderId, date: $date) {
            id
            packageReceivedAt
        }
    }
`;

const OrderRow = ({ order, refetch }) => {
    const history = useHistory();
    const location = useLocation();

    const [captureOrderFunds] = useMutation(CAPTURE_ORDER_FUNDS);
    const [sendOrderTrackingEmail] = useMutation(SEND_ORDER_TRACKING_EMAIL);
    const [markAsReceived] = useMutation(ORDER_RECEIVED_BY_CUSTOMER_MUTATION);

    const [
        captureOrderFundsStatus,
        setCaptureOrderFundsStatus,
    ] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    const [
        sendOrderTrackingEmailStatus,
        setSendOrderTrackingEmailStatus,
    ] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    const [markAsReceivedStatus, setMarkAsReceivedStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    const status = getOrderStatus(order);

    return (
        <tr
            key={order.id}
            onClick={() => history.push(`${location.pathname}/${order.id}`)}
            style={{
                cursor: 'pointer',
            }}
        >
            <td>{order.id}</td>
            <td>{formatPrice(order.totalPriceWithoutShippingAndTaxes)}</td>
            <td>
                {(
                    (order.estimatedMargin /
                        order.totalPriceWithoutShippingAndTaxes) *
                    100
                ).toFixed(1)}
                %
            </td>
            <td>
                {formatPrice(order.estimatedMargin)}
                {order.numberOfProductsMissingForEstimation !== 0 && (
                    <>({order.numberOfProductsMissingForEstimation})</>
                )}
            </td>
            <td>
                {order.firstName} {order.lastName}
            </td>
            <td>{Date.niceDateTime(order.succeededAt)}</td>
            <td>{status.text}</td>
            <td>
                {captureOrderFundsStatus.loading ||
                sendOrderTrackingEmailStatus.loading ||
                markAsReceivedStatus.loading ? (
                    <Spinner />
                ) : (
                    <>
                        {status.canCaptureFunds && (
                            <div>
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        mutationRequest(
                                            setCaptureOrderFundsStatus,
                                            captureOrderFunds,
                                            {
                                                orderId: order.id,
                                            },
                                            () => refetch()
                                        );
                                    }}
                                >
                                    Capture funds
                                </Link>
                            </div>
                        )}
                        {status.canSendShippingConfirmationEmail && (
                            <div>
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        mutationRequest(
                                            setSendOrderTrackingEmailStatus,
                                            sendOrderTrackingEmail,
                                            {
                                                orderId: order.id,
                                            },
                                            () => refetch()
                                        );
                                    }}
                                >
                                    Send sporing e-post
                                </Link>
                            </div>
                        )}
                        {status.canMarkAsReceived && (
                            <div>
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        mutationRequest(
                                            setMarkAsReceivedStatus,
                                            markAsReceived,
                                            {
                                                orderId: order.id,
                                                date: moment().toISOString(),
                                            },
                                            () => refetch()
                                        );
                                    }}
                                >
                                    Marker som motatt
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </td>
        </tr>
    );
};

export default OrderRow;
