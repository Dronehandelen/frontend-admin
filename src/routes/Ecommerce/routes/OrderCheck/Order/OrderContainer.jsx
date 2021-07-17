import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../../../containers/DefaultHookQuery';
import Order from './Order';
import mutationRequest from '../../../../../helpers/mutationRequest';

const fragment = gql`
    fragment CheckOrderFragment on Order {
        id
        status
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
                title
                warehousePlacement
                gtin
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
        deliveryInfo {
            supplier {
                id
                name
            }
            shippingLabel
            product {
                id
                name
            }
        }
    }
`;

const CREATE_DELIVERY_LABEL = gql`
    mutation CreateOrderDeliveryLabel($orderId: Int!) {
        createOrderDeliveryLabel(orderId: $orderId) {
            ...CheckOrderFragment
        }
    }
    ${fragment}
`;

const SetGtinMutation = gql`
    mutation SetGtinForProduct($productId: Int!, $gtin: String!) {
        productGtin(id: $productId, gtin: $gtin) {
            id
            gtin
        }
    }
`;

const CONFIRM_ORDER = gql`
    mutation ConfirmOrder($orderId: Int!) {
        confirmOrder(orderId: $orderId) {
            ...CheckOrderFragment
        }
    }
    ${fragment}
`;

const GET_ORDER = gql`
    query GetOrder($id: Int!) {
        order(id: $id) {
            ...CheckOrderFragment
        }
    }
    ${fragment}
`;

const OrderContainer = ({ orderId, onDone }) => {
    const [createDeliveryLabel] = useMutation(CREATE_DELIVERY_LABEL);
    const [confirmOrder] = useMutation(CONFIRM_ORDER);
    const [setGtin] = useMutation(SetGtinMutation);

    const [createDeliveryLabelStatus, setCreateDeliveryLabelStatus] =
        React.useState({
            error: false,
            loading: false,
            success: false,
        });

    const [confirmOrderStatus, setConfirmOrderStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    const [setGtinStatus, setSetGtinStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    return (
        <DefaultHookQuery
            queryHookData={useQuery(GET_ORDER, {
                variables: {
                    id: parseInt(orderId),
                },
            })}
        >
            {({ data, refetch }) => {
                return (
                    <Order
                        order={data.order}
                        confirmOrderStatus={confirmOrderStatus}
                        onConfirmOrder={() => {
                            mutationRequest(
                                setConfirmOrderStatus,
                                confirmOrder,
                                {
                                    orderId: data.order.id,
                                },
                                () => onDone()
                            );
                        }}
                        createDeliveryLabelStatus={createDeliveryLabelStatus}
                        onCreateDeliveryLabel={() => {
                            mutationRequest(
                                setCreateDeliveryLabelStatus,
                                createDeliveryLabel,
                                {
                                    orderId: data.order.id,
                                }
                            );
                        }}
                        setGtinStatus={setGtinStatus}
                        onSetGtin={(productId, gtin) => {
                            mutationRequest(
                                setSetGtinStatus,
                                setGtin,
                                {
                                    productId,
                                    gtin,
                                },
                                () => refetch()
                            );
                        }}
                    />
                );
            }}
        </DefaultHookQuery>
    );
};

export default OrderContainer;
