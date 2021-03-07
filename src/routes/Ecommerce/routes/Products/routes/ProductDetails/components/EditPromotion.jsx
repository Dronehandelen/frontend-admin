import React from 'react';
import {
    Button,
    Col,
    FormGroup,
    FormText,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from 'reactstrap';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import formatPrice from '../../../../../../../helpers/formatPrice.js';

const EditPromotion = ({
    isOpen,
    onClose,
    value,
    productPromotionMutation,
    originalPrice,
}) => {
    const [date, setDate] = React.useState(
        moment().add(1, 'month').endOf('month')
    );
    const [price, setPrice] = React.useState(0);
    const [dateFocused, setDateFocused] = React.useState(false);

    React.useEffect(() => {
        if (isOpen && value) {
            setDate(moment(value.validUntil));
            setPrice(value.price);
        }
    }, [isOpen, value]);

    const priceInt = parseInt(price);

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="lg">
            <ModalHeader toggle={onClose}>Endre tilbud</ModalHeader>
            <ModalBody>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Dato</Label>
                            <div>
                                <SingleDatePicker
                                    date={date}
                                    onDateChange={(date) => setDate(date)}
                                    focused={dateFocused}
                                    onFocusChange={({ focused }) =>
                                        setDateFocused(focused)
                                    }
                                    id="promotion-end-date"
                                    displayFormat={() => 'DD. MMM. YY'}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <FormText color="muted">
                                Opprinnelig pris er {formatPrice(originalPrice)}
                            </FormText>
                        </FormGroup>
                        <p>
                            Tilbud i prosent:{' '}
                            {isNaN(priceInt)
                                ? 'uvisst'
                                : `${Math.round(
                                      (1 - priceInt / originalPrice) * 100
                                  )}%`}
                        </p>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() =>
                        productPromotionMutation({
                            validUntil: date.clone().endOf('day'),
                            price: parseInt(price),
                        }).then(() => onClose())
                    }
                >
                    Lagre
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditPromotion;
