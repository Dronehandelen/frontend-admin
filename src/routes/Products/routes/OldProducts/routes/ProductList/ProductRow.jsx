import React from 'react';
import {
    Button,
    CircularProgress,
    TableCell,
    TableRow,
} from '@material-ui/core';
import formatPrice from '../../../../../../helpers/formatPrice';
import mutationRequest from '../../../../../../helpers/mutationRequest';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const LIQUIDATE_MUTATION = gql`
    mutation LiquidateMutation($productId: Int!) {
        liquidateProduct(productId: $productId) {
            id
            isLiquidating
        }
    }
`;

const ProductRow = ({ product, refetch }) => {
    const history = useHistory();
    const [liquidateProduct] = useMutation(LIQUIDATE_MUTATION);

    const [liquidateProductStatus, setLiquidateProductStatus] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    return (
        <TableRow
            hover
            key={product.id}
            onClick={() => history.push(`/products/all/${product.id}`)}
        >
            <TableCell>{product.title}</TableCell>
            <TableCell>{formatPrice(product.pricing.originalPrice)}</TableCell>
            <TableCell>
                {product.pricing.vipPromotionPrice &&
                    formatPrice(product.pricing.vipPromotionPrice.price)}
            </TableCell>
            <TableCell>
                {product.pricing.openPromotionPrice &&
                    formatPrice(product.pricing.openPromotionPrice.price)}
            </TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell
                style={{
                    textAlign: 'right',
                }}
            >
                {liquidateProductStatus.loading ? (
                    <CircularProgress />
                ) : (
                    !product.isLiquidating && (
                        <Button
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();

                                mutationRequest(
                                    setLiquidateProductStatus,
                                    liquidateProduct,
                                    {
                                        productId: product.id,
                                    },
                                    () => refetch()
                                );
                            }}
                        >
                            Liquidate
                        </Button>
                    )
                )}
            </TableCell>
        </TableRow>
    );
};

export default ProductRow;
