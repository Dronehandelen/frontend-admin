import React from 'react';
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import bringConfig from '../../config/bring.js';
import ManagedFormGroup from '../ManagedFormGroup.jsx';
import moment from 'moment';
import ProductPicker from './ProductPicker.jsx';
import { SingleDatePicker } from 'react-dates';

const getOrderPackageInfo = (products) => {
    const info = products.reduce(
        (packageInfo, { product, amount }) => {
            let volume = 2000;
            let weight = product.weight ? product.weight : 1000;

            if (product.width && product.height && product.depth) {
                volume = product.width * product.height * product.depth;
            } else {
                packageInfo.productWithoutVolume += 1;
            }

            if (!product.weight) {
                packageInfo.productWithoutWeight += 1;
            }

            return {
                ...packageInfo,
                volume: packageInfo.volume + volume * amount,
                weight: packageInfo.weight + weight * amount,
            };
        },
        {
            volume: 0,
            weight: 0,
            productWithoutVolume: 0,
            productWithoutWeight: 0,
        }
    );

    return {
        ...info,
        volume:
            info.volume < bringConfig.minVolumeMM3
                ? bringConfig.minVolumeMM3
                : info.volume,
    };
};

const DeliveryPicker = ({ order, onOrder, status, deliveryInfo }) => {
    const packageInfo = getOrderPackageInfo(order.orderProducts);
    const [bringProductId, setBringProductId] = React.useState(null);
    const [postalOfficeId, setPostalOfficeId] = React.useState(null);
    const defaultPackageSize = bringConfig.packageTypes[0];
    const [width, setWidth] = React.useState(defaultPackageSize.size.width);
    const [height, setHeight] = React.useState(defaultPackageSize.size.height);
    const [depth, setDepth] = React.useState(defaultPackageSize.size.depth);
    const [weight, setWeight] = React.useState(packageInfo.weight);
    const [shippingDate, setShippingDate] = React.useState(
        moment().add(1, 'day').startOf('hour').hour(7)
    );
    const [shippingDateFocused, setShippingDateFocused] = React.useState(false);

    return (
        <Card>
            <CardHeader>Bestill levering</CardHeader>
            <CardBody>
                <p>
                    <strong>Volum:</strong> {packageInfo.volume / 1000000}dm3 (
                    {packageInfo.volume}mm3)
                </p>
                <p>
                    <strong>Vekt:</strong> {packageInfo.weight}g (
                    {packageInfo.weight / 1000}kg)
                </p>
                <p>
                    <strong>Produkter uten volum:</strong>{' '}
                    {packageInfo.productWithoutVolume}
                </p>
                <p>
                    <strong>Produkter uten vekt:</strong>{' '}
                    {packageInfo.productWithoutWeight}
                </p>
                <p>
                    <strong>Leveringsmåte:</strong> {deliveryInfo.type}
                </p>
                {deliveryInfo.postalOfficeId && (
                    <p>
                        <strong>Valgt leveringssted id: </strong>
                        {deliveryInfo.postalOfficeId}
                    </p>
                )}

                <hr />
                {status.error && (
                    <Alert color="danger">
                        <div>{status.error.message}</div>
                        <div>{JSON.stringify(status.error)}</div>
                    </Alert>
                )}
                <Row>
                    <Col xs={3}>
                        <ManagedFormGroup error={status.error} inputKey="width">
                            {(errors) => (
                                <>
                                    <Label>Bredde (mm)</Label>
                                    <Input
                                        type="number"
                                        step="1"
                                        min="1"
                                        name="width"
                                        placeholder="Bredde"
                                        value={width}
                                        onChange={(e) =>
                                            setWidth(parseInt(e.target.value))
                                        }
                                        invalid={!!errors}
                                    />
                                </>
                            )}
                        </ManagedFormGroup>
                    </Col>
                    <Col xs={3}>
                        <ManagedFormGroup
                            error={status.error}
                            inputKey="height"
                        >
                            {(errors) => (
                                <>
                                    <Label>Høyde (mm)</Label>
                                    <Input
                                        type="number"
                                        step="1"
                                        min="1"
                                        name="height"
                                        placeholder="Høyde"
                                        value={height}
                                        onChange={(e) =>
                                            setHeight(parseInt(e.target.value))
                                        }
                                        invalid={!!errors}
                                    />
                                </>
                            )}
                        </ManagedFormGroup>
                    </Col>
                    <Col xs={3}>
                        <ManagedFormGroup error={status.error} inputKey="depth">
                            {(errors) => (
                                <>
                                    <Label>Dybde (mm)</Label>
                                    <Input
                                        type="number"
                                        step="1"
                                        min="1"
                                        name="depth"
                                        placeholder="Dybde"
                                        value={depth}
                                        onChange={(e) =>
                                            setDepth(parseInt(e.target.value))
                                        }
                                        invalid={!!errors}
                                    />
                                </>
                            )}
                        </ManagedFormGroup>
                    </Col>
                    <Col xs={3}>
                        <ManagedFormGroup
                            error={status.error}
                            inputKey="weight"
                        >
                            {(errors) => (
                                <>
                                    <Label>Vekt (g)</Label>
                                    <Input
                                        type="number"
                                        step="1"
                                        min="1"
                                        name="weight"
                                        placeholder="Vekt"
                                        value={weight}
                                        onChange={(e) =>
                                            setWeight(parseInt(e.target.value))
                                        }
                                        invalid={!!errors}
                                    />
                                </>
                            )}
                        </ManagedFormGroup>
                    </Col>
                </Row>
                <div className="mb-3">
                    {bringConfig.packageTypes.map((info, index) => (
                        <Button
                            outline
                            className="mr-1"
                            key={index}
                            onClick={() => {
                                setWidth(info.size.width);
                                setHeight(info.size.height);
                                setDepth(info.size.depth);
                            }}
                        >
                            {info.name}
                        </Button>
                    ))}
                </div>
                <Row>
                    <Col xs={3}>
                        <FormGroup>
                            <Label>Dato</Label>
                            <div>
                                <SingleDatePicker
                                    date={shippingDate}
                                    onDateChange={(date) =>
                                        setShippingDate(date)
                                    }
                                    focused={shippingDateFocused}
                                    onFocusChange={({ focused }) =>
                                        setShippingDateFocused(focused)
                                    }
                                    id="shipping-date"
                                    displayFormat={() => 'DD. MMM. YY'}
                                />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs={3}>
                        <FormGroup>
                            <Label>Time</Label>
                            <Input
                                type="number"
                                min={0}
                                max={23}
                                value={shippingDate.hour()}
                                onChange={(e) =>
                                    setShippingDate(
                                        shippingDate
                                            .clone()
                                            .hour(e.target.value)
                                    )
                                }
                            />
                        </FormGroup>
                    </Col>
                </Row>
                {packageInfo.volume === 0 && (
                    <p>Vennligst oppgi informasjon om pakken.</p>
                )}
                {packageInfo.volume !== 0 && (
                    <ProductPicker
                        postalCode={order.address.postalCode}
                        selectedPostalOfficeId={postalOfficeId}
                        selectedProductId={bringProductId}
                        setSelectedProductId={setBringProductId}
                        setSelectedPostalOfficeId={setPostalOfficeId}
                        volume={width * height * depth}
                    >
                        {() => (
                            <>
                                {postalOfficeId &&
                                    deliveryInfo.postalOfficeId &&
                                    postalOfficeId !==
                                        deliveryInfo.postalOfficeId && (
                                        <Alert color="warning">
                                            Du har ikke valgt samme
                                            utleveringsted som kunden.
                                        </Alert>
                                    )}

                                <Button
                                    block
                                    size="lg"
                                    color="primary"
                                    disabled={
                                        !bringProductId ||
                                        (bringProductId ===
                                            bringConfig.services
                                                .PAKKE_TIL_HENTESTED &&
                                            !postalOfficeId)
                                    }
                                    onClick={() =>
                                        onOrder(
                                            {
                                                width,
                                                height,
                                                depth,
                                                weight,
                                            },
                                            {
                                                shippingDate,
                                                productId: bringProductId,
                                                pickupPointId:
                                                    bringConfig.services
                                                        .PAKKE_TIL_HENTESTED ===
                                                        bringProductId &&
                                                    postalOfficeId
                                                        ? postalOfficeId
                                                        : null,
                                            }
                                        )
                                    }
                                >
                                    Bestill
                                </Button>
                            </>
                        )}
                    </ProductPicker>
                )}
                {status.success && (
                    <Alert color="success" className="mt-2">
                        Vellykket
                    </Alert>
                )}
            </CardBody>
        </Card>
    );
};

export default DeliveryPicker;
