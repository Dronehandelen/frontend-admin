import React from 'react';
import { Button, Col, Container, Input, Row, Table } from 'reactstrap';
import ProductPicker from '../../../../../../../components/ProductPicker.jsx';

const updateState = (setState, products, index, key, float) => (e) => {
    setState({
        products: products.map((p, index2) =>
            index === index2
                ? {
                      ...p,
                      [key]: float
                          ? parseFloat(e.target.value)
                          : parseInt(e.target.value),
                  }
                : p
        ),
    });
};

const Products = ({ state, setState }) => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Button
                        color="primary"
                        onClick={() => {
                            setState({
                                products: [
                                    {
                                        productId: null,
                                        amount: 1,
                                        pricePerItem: 1,
                                    },
                                    ...state.products,
                                ],
                            });
                        }}
                    >
                        Add
                    </Button>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Pris per item</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {state.products.map((product, index) => (
                                <tr>
                                    <td>
                                        <ProductPicker
                                            maxCount={1}
                                            selectedProducts={
                                                product.productId
                                                    ? [
                                                          {
                                                              id:
                                                                  product.productId,
                                                          },
                                                      ]
                                                    : []
                                            }
                                            setSelectedProducts={(products) => {
                                                const productId =
                                                    products.length === 0
                                                        ? null
                                                        : products[0].id;
                                                updateState(
                                                    setState,
                                                    state.products,
                                                    index,
                                                    'productId'
                                                )({
                                                    target: {
                                                        value: productId,
                                                    },
                                                });
                                            }}
                                        >
                                            {({ products, openPicker }) => (
                                                <div
                                                    className="btn-link"
                                                    onClick={openPicker}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {products.length !== 0
                                                        ? products[0].id +
                                                          ' - ' +
                                                          products[0].title
                                                        : 'Velg'}
                                                </div>
                                            )}
                                        </ProductPicker>
                                    </td>
                                    <td>
                                        <Input
                                            type="number"
                                            step="1"
                                            min="1"
                                            value={product.amount}
                                            onChange={updateState(
                                                setState,
                                                state.products,
                                                index,
                                                'amount'
                                            )}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={product.pricePerItem}
                                            onChange={updateState(
                                                setState,
                                                state.products,
                                                index,
                                                'pricePerItem',
                                                true
                                            )}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            className="btn-link"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                setState({
                                                    products: state.products.filter(
                                                        (p, index2) =>
                                                            index !== index2
                                                    ),
                                                })
                                            }
                                        >
                                            Fjern
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;
