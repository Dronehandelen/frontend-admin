import React from 'react';
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import barcode from '../../../../../contexts/barcode';

const Order = ({
    order,
    confirmOrderStatus,
    onConfirmOrder,
    createDeliveryLabelStatus,
    onCreateDeliveryLabel,
    onSetGtin,
}) => {
    const mustCreateLabel = !(
        order.deliveryInfo.supplier.id === 'get_self' ||
        order.deliveryInfo.shippingLabel
    );

    const [productToUpdate, setProductToUpdate] = React.useState(null);
    const [gtin, setGtin] = React.useState('');

    const [checkedProducts, setCheckedProducts] = React.useState({});

    const check = React.useCallback(
        (productId, amount) => {
            const newCheckProducts = { ...checkedProducts };
            if (!newCheckProducts[productId]) {
                newCheckProducts[productId] = 0;
            }

            newCheckProducts[productId] = newCheckProducts[productId] + amount;

            const orderProduct = order.orderProducts.find(
                (orderProduct) => orderProduct.product.id === productId
            );

            if (!orderProduct) {
                return;
            }

            if (orderProduct.amount < newCheckProducts[productId]) {
                newCheckProducts[productId] = orderProduct.amount;
            }

            setCheckedProducts(newCheckProducts);
        },
        [checkedProducts, order, setCheckedProducts]
    );

    const { addListener, clearListener } = React.useContext(barcode);

    const handleCloseProductToUpdate = React.useCallback(() => {
        setProductToUpdate(null);
        setGtin(null);
    }, [setProductToUpdate, setGtin]);

    const ready = React.useMemo(() => {
        return !order.orderProducts.some(
            (orderProduct) =>
                orderProduct.amount !== checkedProducts[orderProduct.product.id]
        );
    }, [order, checkedProducts]);

    React.useEffect(() => {
        const listener = addListener((barcode) => {
            console.log(barcode);
            const orderProduct = order.orderProducts.find(
                (orderProduct) => orderProduct.product.gtin === barcode
            );

            if (orderProduct) {
                check(orderProduct.product.id, 1);
            }
        });

        return () => clearListener(listener);
    }, [order, check, addListener, clearListener]);

    return (
        <>
            <Grid container className="mt-5" spacing={1}>
                <Grid item xs={6}>
                    <Card>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <strong>Navn</strong>
                                    </TableCell>
                                    <TableCell>
                                        {order.firstName} {order.lastName}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Postnummer</strong>
                                    </TableCell>
                                    <TableCell>
                                        {order.address.postalCode}{' '}
                                        {order.address.postalPlace}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card component={Box} padding={1}>
                        {!ready && (
                            <div>Sjekk alle varene for å komme deg videre</div>
                        )}
                        {ready && (
                            <>
                                {mustCreateLabel && (
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className="mb-1"
                                        onClick={onCreateDeliveryLabel}
                                        disabled={
                                            createDeliveryLabelStatus.loading
                                        }
                                    >
                                        Lag sendeetikett
                                    </Button>
                                )}
                                {!mustCreateLabel && (
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className="mb-1"
                                        onClick={onConfirmOrder}
                                        disabled={confirmOrderStatus.loading}
                                    >
                                        Bekreft bestilling
                                    </Button>
                                )}
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={() => setCheckedProducts({})}
                                >
                                    Sjekk varene på nytt
                                </Button>
                            </>
                        )}
                        {createDeliveryLabelStatus.error ||
                            (confirmOrderStatus.error && (
                                <Alert color="danger">Noe skjedde</Alert>
                            ))}
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Bilde</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Navn og beskrivelse</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Plasering</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Antall</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Handlinger</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.orderProducts.map((orderProduct) => {
                                    const amountLeft =
                                        orderProduct.amount -
                                        (checkedProducts[
                                            orderProduct.product.id
                                        ] || 0);

                                    const checkDone = amountLeft === 0;

                                    return (
                                        <TableRow
                                            key={orderProduct.product.id}
                                            onClick={() =>
                                                setProductToUpdate(
                                                    orderProduct.product
                                                )
                                            }
                                        >
                                            <TableCell>
                                                <img
                                                    height={50}
                                                    src={
                                                        orderProduct.product
                                                            .primaryImage.url
                                                    }
                                                    alt=""
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <strong>
                                                        {
                                                            orderProduct.product
                                                                .title
                                                        }
                                                    </strong>
                                                </div>
                                                <div>
                                                    {
                                                        orderProduct.product
                                                            .shortDescription
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    orderProduct.product
                                                        .warehousePlacement
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {orderProduct.amount} stk.
                                            </TableCell>
                                            <TableCell>
                                                {!checkDone && (
                                                    <Button
                                                        variant="contained"
                                                        color={
                                                            orderProduct.product
                                                                .gtin
                                                                ? 'secondary'
                                                                : 'primary'
                                                        }
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            check(
                                                                orderProduct
                                                                    .product.id,
                                                                orderProduct.amount
                                                            );
                                                        }}
                                                    >
                                                        Bekreft <br />(
                                                        {amountLeft} igjen)
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </Grid>
            <Dialog
                open={!!productToUpdate}
                onClose={handleCloseProductToUpdate}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle>
                    Sett GTIN for {productToUpdate && productToUpdate.title}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="GTIN"
                        fullWidth
                        value={gtin}
                        onChange={(e) => setGtin(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseProductToUpdate}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onSetGtin(productToUpdate.id, gtin);
                            handleCloseProductToUpdate();
                        }}
                        color="primary"
                    >
                        Oppdater
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Order;
