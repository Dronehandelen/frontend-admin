import React from 'react';
import {
    Col,
    Container,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
} from 'reactstrap';
import ManagedFormGroup from '../../../../../../../components/ManagedFormGroup.jsx';
import { SingleDatePicker } from 'react-dates';

const Meta = ({ state, setState, error }) => {
    const [dateFocused, setDateFocused] = React.useState(false);

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label>Order date</Label>
                        <div>
                            <SingleDatePicker
                                isOutsideRange={() => false}
                                date={state.orderDate}
                                onDateChange={(date) =>
                                    setState({ orderDate: date })
                                }
                                focused={dateFocused}
                                onFocusChange={({ focused }) =>
                                    setDateFocused(focused)
                                }
                                id="order-date"
                                displayFormat={() => 'DD. MMM. YY'}
                            />
                        </div>
                    </FormGroup>
                    <ManagedFormGroup error={error} inputKey="supplierId">
                        {(errors) => (
                            <>
                                <Label>Supplier id</Label>
                                <Input
                                    type="number"
                                    step="1"
                                    name="supplierId"
                                    value={state.supplierId}
                                    onChange={(e) =>
                                        setState({
                                            supplierId: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="totalPrice">
                        {(errors) => (
                            <>
                                <Label>Total price</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="totalPrice"
                                    value={state.totalPrice}
                                    onChange={(e) =>
                                        setState({
                                            totalPrice: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                                <FormText color="muted">
                                    This price must be in the invoice currency
                                </FormText>
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="shippingPrice">
                        {(errors) => (
                            <>
                                <Label>Shipping price</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="shippingPrice"
                                    value={state.shippingPrice}
                                    onChange={(e) =>
                                        setState({
                                            shippingPrice: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                                <FormText color="muted">
                                    This price must be in the invoice currency
                                </FormText>
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="otherFeesPrice">
                        {(errors) => (
                            <>
                                <Label>Other fees</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="otherFeesPrice"
                                    value={state.otherFeesPrice}
                                    onChange={(e) =>
                                        setState({
                                            otherFeesPrice: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                                <FormText color="muted">
                                    This price must be in the invoice currency
                                </FormText>
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="currency">
                        {(errors) => (
                            <>
                                <Label>Other fees</Label>

                                <Input
                                    type="select"
                                    name="currency"
                                    value={state.currency}
                                    onChange={(e) =>
                                        setState({
                                            currency: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                >
                                    {['NOK', 'USD', 'EUR'].map((currency) => (
                                        <option value={currency} key={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </Input>
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="exchangeRate">
                        {(errors) => (
                            <>
                                <Label>Exchange rate</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="exchangeRate"
                                    value={state.exchangeRate}
                                    onChange={(e) =>
                                        setState({
                                            exchangeRate: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                                <FormText color="muted">
                                    The factor to use when converting from
                                    invoice currency to NOK. For example when
                                    the invoice is in USD the exhange rate will
                                    be between 8 and 10. Always use bank
                                    statement for this. It is important to use
                                    correct rate.
                                </FormText>
                            </>
                        )}
                    </ManagedFormGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Meta;
