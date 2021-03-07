import React from 'react';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import ProductPicker from '../../../../../../../components/ProductPicker.jsx';

const PackageProducts = ({ packageProducts }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <ProductPicker
                        selectedProducts={packageProducts.value}
                        setSelectedProducts={packageProducts.setValue}
                        productMetadataRenderer={({ productInfo }) => (
                            <div>
                                <FormGroup>
                                    <Label>Antall</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={productInfo.amount}
                                        onChange={(e) => {
                                            packageProducts.setValue(
                                                [...packageProducts.value].map(
                                                    (v) =>
                                                        v.id === productInfo.id
                                                            ? {
                                                                  ...productInfo,
                                                                  amount: parseInt(
                                                                      e.target
                                                                          .value
                                                                  ),
                                                              }
                                                            : v
                                                )
                                            );
                                        }}
                                    />
                                </FormGroup>
                            </div>
                        )}
                        defaultMetadataValues={{
                            amount: 1,
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default PackageProducts;
