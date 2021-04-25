import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProductPicker from '../../../../../../../components/ProductPicker.jsx';

const Accessories = ({ accessoryProducts }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <ProductPicker
                        selectedProducts={accessoryProducts.value}
                        setSelectedProducts={accessoryProducts.setValue}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Accessories;
