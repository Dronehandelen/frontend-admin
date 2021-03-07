const orderStatus = {
    DONE: 'done',
    CHECKOUT: 'checkout',
    BLOCKED_FOR_PAYMENT: 'blocked',
    FAILED: 'failed',
    WAITING_CONFIRMATION: 'wait_conf',
    WAITING_BACKORDER_CONFIRMATION: 'wbc',
    WAITING_FOR_BACKORDER_PRODUCTS: 'wfbp',
    CANCELLED: 'cancelled',
};

export default orderStatus;
