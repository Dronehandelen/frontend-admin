import React from 'react';
import { Box, Button, Container, Grid } from '@material-ui/core';
import Order from './Order';

const Navigator = ({ orders, refetch }) => {
    const [orderId, setOrderId] = React.useState(null);

    React.useEffect(() => {
        if (orders.length === 0) {
            if (orderId !== null) {
                setOrderId(null);
            }

            return;
        }

        if (!orders.some((order) => order.id === orderId)) {
            setOrderId(orders[0].id);
        }
    }, [orders, orderId]);

    const currentIndex = React.useMemo(
        () => orders.findIndex((o) => o.id === orderId),
        [orders, orderId]
    );

    const previous = React.useMemo(() => {
        if (
            !orderId ||
            orders.length === 0 ||
            currentIndex === -1 ||
            currentIndex === 0
        ) {
            return null;
        }

        return () => setOrderId(orders[currentIndex - 1].id);
    }, [orderId, currentIndex, orders]);

    const next = React.useMemo(() => {
        if (
            !orderId ||
            orders.length === 0 ||
            currentIndex === -1 ||
            currentIndex >= orders.length - 1
        ) {
            return null;
        }

        return () => setOrderId(orders[currentIndex + 1].id);
    }, [orderId, currentIndex, orders]);

    return (
        <Container maxWidth={false}>
            <Grid container>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={!previous}
                        onClick={previous}
                    >
                        Forrige
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <Box padding={1} className="text-center">
                        Bestilling {currentIndex + 1} av {orders.length}
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={!next}
                        onClick={next}
                    >
                        Neste
                    </Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    {orderId && (
                        <Order
                            orderId={orderId}
                            onDone={() => {
                                next && next();
                                refetch();
                            }}
                        />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Navigator;
