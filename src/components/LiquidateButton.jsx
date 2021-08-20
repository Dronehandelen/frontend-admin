import React from 'react';
import { gql, useMutation } from '@apollo/client';
import mutationRequest from '../helpers/mutationRequest';
import { Button, CircularProgress } from '@material-ui/core';

const LIQUIDATE_MUTATION = gql`
    mutation LiquidateMutation($productId: Int!) {
        liquidateProduct(productId: $productId) {
            id
            isLiquidating
        }
    }
`;

const LiquidateButton = ({
    productId,
    show,
    onUpdated = () => {},
    hideLiquidated = false,
    ...props
}) => {
    const [liquidateProduct] = useMutation(LIQUIDATE_MUTATION);

    const [liquidateProductStatus, setLiquidateProductStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    if (!show) {
        if (hideLiquidated) {
            return <></>;
        }

        return (
            <Button color="primary" variant="contained" disabled {...props}>
                Liquidated
            </Button>
        );
    }

    return (
        <Button
            color="primary"
            variant="contained"
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                mutationRequest(
                    setLiquidateProductStatus,
                    liquidateProduct,
                    {
                        productId,
                    },
                    onUpdated
                );
            }}
            {...props}
        >
            {liquidateProductStatus.loading ? (
                <CircularProgress />
            ) : (
                'Liquidate'
            )}
        </Button>
    );
};

export default LiquidateButton;
