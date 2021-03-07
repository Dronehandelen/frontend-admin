import React from 'react';
import OrderDetails from './OrderDetails';
import mutationRequest from '../../../../../../helpers/mutationRequest.js';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { gql, useQuery, useMutation } from '@apollo/client';

const UPDATE_ORDER_TRACKING_MUTATION = gql`
    mutation UpdateOrderTrackingCode($orderId: Int!, $trackingCode: String!) {
        setTrackingCode(orderId: $orderId, trackingCode: $trackingCode) {
            id
        }
    }
`;

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
        orderReceivedByCustomer(orderId: $orderId, date: $date)
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
                deliveryTypeInfo {
                    id
                    name
                }
                bring {
                    typeInfo {
                        id
                        name
                    }
                    postalOfficeId
                    trackingCode
                    shippingLabel
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
    const [updateOrderTrackingCode] = useMutation(
        UPDATE_ORDER_TRACKING_MUTATION
    );
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

    const [trackingCodeStatus, setTrackingCodeStatus] = React.useState({
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

    const [
        bookOrderDeliveryStatus,
        setBookOrderDeliveryStatus,
    ] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    const [
        recreateOrderDocumentsStatus,
        setRecreateOrderDocumentsStatus,
    ] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    const [
        orderReceivedByCustomerStatus,
        setOrderReceivedByCustomerStatus,
    ] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    const [
        captureOrderFundsStatus,
        setCaptureOrderFundsStatus,
    ] = React.useState({
        error: false,
        loading: false,
        success: false,
    });
    const [
        completeBackorderStatus,
        setCompleteBackorderStatus,
    ] = React.useState({
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
                    trackingCodeStatus={trackingCodeStatus}
                    sendOrderTrackingEmailStatus={sendOrderTrackingEmailStatus}
                    bookOrderDeliveryStatus={bookOrderDeliveryStatus}
                    recreateOrderDocumentsStatus={recreateOrderDocumentsStatus}
                    orderReceivedByCustomerStatus={
                        orderReceivedByCustomerStatus
                    }
                    captureOrderFundsStatus={captureOrderFundsStatus}
                    completeBackorderStatus={completeBackorderStatus}
                    onSetTrackingCode={(trackingCode) => {
                        mutationRequest(
                            setTrackingCodeStatus,
                            updateOrderTrackingCode,
                            {
                                trackingCode,
                                orderId: data.order.id,
                            },
                            () => refetch()
                        );
                    }}
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
                />
            )}
        </DefaultHookQuery>
    );
};

export default OrderDetailsContainer;
