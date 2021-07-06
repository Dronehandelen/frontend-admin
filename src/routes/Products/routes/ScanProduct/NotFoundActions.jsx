import React from 'react';
import ProductPicker from '../../../../components/ProductPicker';
import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

const SetGtinMutation = gql`
    mutation SetGtinForProduct($productId: Int!, $gtin: String!) {
        productGtin(id: $productId, gtin: $gtin) {
            id
            gtin
        }
    }
`;

const NotFoundActions = ({ gtin, done }) => {
    const [products, setProducts] = React.useState([]);
    const [setGtinMutation] = useMutation(SetGtinMutation);

    return (
        <>
            <p>Gtin {gtin} ikke funnet.</p>
            <div>
                <ProductPicker
                    maxCount={1}
                    selectedProducts={products}
                    setSelectedProducts={setProducts}
                    colProps={{ xs: 12, md: 12 }}
                    minimal
                >
                    {({ openPicker, products }) => {
                        if (products.length !== 0) {
                            return (
                                <div>
                                    <div>{products[0].title}</div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={openPicker}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setGtinMutation({
                                                    variables: {
                                                        gtin,
                                                        productId:
                                                            products[0].id,
                                                    },
                                                }).then(() => done());
                                            }}
                                        >
                                            Lagre
                                        </Button>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={openPicker}
                                >
                                    Velg product
                                </Button>
                            </div>
                        );
                    }}
                </ProductPicker>
            </div>
        </>
    );
};

export default NotFoundActions;
