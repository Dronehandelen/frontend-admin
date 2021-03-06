import React from 'react';
import OrderDetails from './OrderDetails';
import mutationRequest from '../../../../../../helpers/mutationRequest.js';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { gql, useQuery, useMutation } from '@apollo/client';

const SEND_ORDER_TRACKING_MUTATION = gql`
    mutation SendOrderTrackingEmail($orderId: Int!) {
        sendOrderTrackingEmail(orderId: $orderId) {
            id
            shippingEmailSentAt
        }
    }
`;

const BOOK_ORDER_DELIVERY_MUTATION = gql`
    mutation BookOrderDelivery(
        $orderId: Int!
        $shippingInfo: ShippingInfoInput!
        $packageInfo: PackageInfoInput!
    ) {
        bookOrderDelivery(
            orderId: $orderId
            shippingInfo: $shippingInfo
            packageInfo: $packageInfo
        )
    }
`;

const RECREATE_ORDER_DOCUMENTS_MUTATION = gql`
    mutation RecreateOrderDocuments($orderId: Int!) {
        recreateOrderDocuments(orderId: $orderId)
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

const CAPTURE_ORDER_FUNDS_MUTATION = gql`
    mutation CaptureOrderFunds($orderId: Int!) {
        captureOrderFunds(orderId: $orderId) {
            id
        }
    }
`;

const COMPLETE_BACKORDER_MUTATION = gql`
    mutation CompleteBackorder($orderId: Int!) {
        completeBackorder(orderId: $orderId)
    }
`;

const REFUND_ORDER_MUTATION = gql`
    mutation RefundOrder($orderId: Int!, $amount: Int) {
        refundOrder(orderId: $orderId, amount: $amount) {
            id
            status
            refundedAmountInCent
            cancelledAt
        }
    }
`;

const GET_ORDER = gql`
    query GetOrder($id: Int!) {
        order(id: $id) {
            id
            status
            totalPrice
            shippingPrice
            succeededAt
            phone
            email
            firstName
            lastName
            shippingEmailSentAt
            packageReceivedAt
            paymentMethod
            orderProducts {
                amount
                price
                product {
                    id
                    shortDescription
                    price
                    title
                    width
                    height
                    depth
                    weight
                    warehousePlacement
                    images {
                        fileId
                        url
                    }
                    primaryImage {
                        fileId
                        url
                    }
                }
            }
            address {
                id
                address
                postalCode
                postalPlace
                country
                co
            }
            receipt {
                url
            }
            packingList {
                url
            }
            deliveryType
            deliveryInfo {
                supplier {
                    id
                    name
                }
                trackingUrl
                postalOfficeId
                shippingLabel
                product {
                    id
                    name
                }
            }
            events {
                event
                happenedAt
            }
        }
    }
`;

const OrderDetailsContainer = (props) => {
    const [sendOrderTrackingEmail] = useMutation(SEND_ORDER_TRACKING_MUTATION);
    const [bookOrderDelivery] = useMutation(BOOK_ORDER_DELIVERY_MUTATION);
    const [recreateOrderDocuments] = useMutation(
        RECREATE_ORDER_DOCUMENTS_MUTATION
    );
    const [orderReceivedByCustomer] = useMutation(
        ORDER_RECEIVED_BY_CUSTOMER_MUTATION
    );
    const [captureOrderFunds] = useMutation(CAPTURE_ORDER_FUNDS_MUTATION);
    const [completeBackorder] = useMutation(COMPLETE_BACKORDER_MUTATION);
    const [refundOrder] = useMutation(REFUND_ORDER_MUTATION);

    const [sendOrderTrackingEmailStatus, setSendOrderTrackingEmailStatus] =
        React.useState({
            error: false,
            loading: false,
            success: false,
        });

    const [bookOrderDeliveryStatus, setBookOrderDeliveryStatus] =
        React.useState({
            error: false,
            loading: false,
            success: false,
        });

    const [recreateOrderDocumentsStatus, setRecreateOrderDocumentsStatus] =
        React.useState({
            error: false,
            loading: false,
            success: false,
        });

    const [orderReceivedByCustomerStatus, setOrderReceivedByCustomerStatus] =
        React.useState({
            error: false,
            loading: false,
            success: false,
        });

    const [captureOrderFundsStatus, setCaptureOrderFundsStatus] =
        React.useState({
            error: false,
            loading: false,
            success: false,
        });
    const [completeBackorderStatus, setCompleteBackorderStatus] =
        React.useState({
            error: false,
            loading: false,
            success: false,
        });
    const [refundOrderStatus, setRefundOrderStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    return (
        <DefaultHookQuery
            queryHookData={useQuery(GET_ORDER, {
                variables: {
                    id: parseInt(props.match.params.orderId),
                },
            })}
        >
            {({ data, refetch }) => (
                <OrderDetails
                    {...props}
                    order={data.order}
                    sendOrderTrackingEmailStatus={sendOrderTrackingEmailStatus}
                    bookOrderDeliveryStatus={bookOrderDeliveryStatus}
                    recreateOrderDocumentsStatus={recreateOrderDocumentsStatus}
                    orderReceivedByCustomerStatus={
                        orderReceivedByCustomerStatus
                    }
                    captureOrderFundsStatus={captureOrderFundsStatus}
                    completeBackorderStatus={completeBackorderStatus}
                    refundOrderStatus={refundOrderStatus}
                    onSendOrderTrackingEmail={() => {
                        mutationRequest(
                            setSendOrderTrackingEmailStatus,
                            sendOrderTrackingEmail,
                            {
                                orderId: data.order.id,
                            },
                            () => refetch()
                        );
                    }}
                    onBookOrderDelivery={(packageInfo, shippingInfo) => {
                        mutationRequest(
                            setBookOrderDeliveryStatus,
                            bookOrderDelivery,
                            {
                                orderId: data.order.id,
                                shippingInfo,
                                packageInfo,
                            },
                            () => refetch()
                        );
                    }}
                    onRecreateOrderDocuments={() => {
                        mutationRequest(
                            setRecreateOrderDocumentsStatus,
                            recreateOrderDocuments,
                            {
                                orderId: data.order.id,
                            },
                            () => refetch()
                        );
                    }}
                    onOrderReceivedByCustomer={(date) => {
                        mutationRequest(
                            setOrderReceivedByCustomerStatus,
                            orderReceivedByCustomer,
                            {
                                orderId: data.order.id,
                                date,
                            },
                            () => refetch()
                        );
                    }}
                    onCaptureOrderFunds={() => {
                        mutationRequest(
                            setCaptureOrderFundsStatus,
                            captureOrderFunds,
                            {
                                orderId: data.order.id,
                            },
                            () => refetch()
                        );
                    }}
                    onCompleteBackorder={() => {
                        mutationRequest(
                            setCompleteBackorderStatus,
                            completeBackorder,
                            {
                                orderId: data.order.id,
                            },
                            () => refetch()
                        );
                    }}
                    onRefundOrder={(amount = null) => {
                        mutationRequest(
                            setRefundOrderStatus,
                            refundOrder,
                            {
                                orderId: data.order.id,
                                amount,
                            },
                            () => {}
                        );
                    }}
                />
            )}
        </DefaultHookQuery>
    );
};

export default OrderDetailsContainer;
