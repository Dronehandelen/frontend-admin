import orderStatus from '../../../../../../constants/orderStatus.js';
import moment from 'moment';

const getOrderStatus = (order) => {
    if (order.status === orderStatus.CANCELLED) {
        return {
            text: 'Kansellert',
        };
    }

    if (order.status === orderStatus.WAITING_CONFIRMATION) {
        return {
            text: 'Summen er låst på kunden sitt kort. Lager må bekreftes før kortet belastes',
            canCaptureFunds: true,
        };
    }

    if (order.status === orderStatus.WAITING_BACKORDER_CONFIRMATION) {
        return {
            text: 'Dette er en restordre. Summen må belastes',
            canCaptureFunds: true,
        };
    }

    if (order.status === orderStatus.WAITING_FOR_BACKORDER_PRODUCTS) {
        return {
            text: 'Venter at produkter skal komme på lager',
        };
    }

    if (order.deliveryInfo.trackingUrl) {
        if (order.shippingEmailSentAt === null) {
            return {
                text: 'Lever pakken til posten og send e-post om at pakken er levert.',
                canSendShippingConfirmationEmail: true,
            };
        }
    }

    if (!order.packageReceivedAt) {
        return {
            text: order.deliveryInfo.trackingUrl
                ? 'Kunden venter på pakken.'
                : 'Kunden må hente pakken sin.',
            canMarkAsReceived: order.deliveryInfo.trackingUrl
                ? moment(order.succeededAt).isBefore(
                      moment().subtract(1, 'month')
                  )
                : true,
        };
    }

    return {
        text: 'Kunden har fått pakken sin',
    };
};

export default getOrderStatus;
