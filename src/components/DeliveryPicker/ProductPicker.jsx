import React from 'react';
import { Alert, FormGroup, Input, Label, Spinner } from 'reactstrap';
import formatPrice from '../../helpers/formatPrice.js';
import bringConfig from '../../config/bring.js';
import PostalOfficePicker from './PostalOfficePicker.jsx';
import { gql, useQuery } from '@apollo/client';

const GET_BRING_DELIVERY_PRODUCTS_QUERY = gql`
    query GetBringDeliveryProducts($volume: Int!, $postalCode: String!) {
        bringDeliveryProducts(volume: $volume, toPostalCode: $postalCode) {
            id
            displayName
            price
        }
    }
`;

const ProductPicker = ({
    volume,
    postalCode,
    selectedProductId,
    setSelectedProductId,
    selectedPostalOfficeId,
    setSelectedPostalOfficeId,
    children,
}) => {
    const { loading, error, data } = useQuery(
        GET_BRING_DELIVERY_PRODUCTS_QUERY,
        {
            variables: {
                volume,
                postalCode,
            },
        }
    );

    React.useEffect(() => {
        if (data && data.bringDeliveryProducts.length !== 0) {
            setSelectedProductId(data.bringDeliveryProducts[0].id);
        }
    }, [data, setSelectedProductId]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">Noe skjedde</Alert>;
    }

    const isReady =
        selectedProductId &&
        (selectedProductId !== bringConfig.services.PAKKE_TIL_HENTESTED ||
            selectedPostalOfficeId);

    return (
        <>
            {data && (
                <FormGroup>
                    <Label>Velg bring produkt</Label>
                    <Input
                        type="select"
                        value={selectedProductId}
                        onChange={(e) =>
                            setSelectedProductId(parseInt(e.target.value))
                        }
                    >
                        {data.bringDeliveryProducts.map(
                            (bringDeliveryProduct) => (
                                <option
                                    value={bringDeliveryProduct.id}
                                    key={bringDeliveryProduct.id}
                                >
                                    {bringDeliveryProduct.displayName}{' '}
                                    {formatPrice(bringDeliveryProduct.price)}
                                </option>
                            )
                        )}
                    </Input>
                </FormGroup>
            )}
            {selectedProductId === bringConfig.services.PAKKE_TIL_HENTESTED && (
                <PostalOfficePicker
                    setPostalOfficeId={setSelectedPostalOfficeId}
                    postalOfficeId={selectedPostalOfficeId}
                    postalCode={postalCode}
                />
            )}
            {isReady && (
                <div>
                    {children({
                        isReady: false,
                    })}
                </div>
            )}
        </>
    );
};

export default ProductPicker;
