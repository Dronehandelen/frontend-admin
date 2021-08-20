import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import formatPrice from '../../../../../../helpers/formatPrice';
import { useHistory } from 'react-router-dom';
import LiquidateButton from '../../../../../../components/LiquidateButton';

const ProductRow = ({ product, refetch }) => {
    const history = useHistory();

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
                <LiquidateButton
                    productId={product.id}
                    onUpdated={() => refetch()}
                    show={!product.isLiquidating}
                    hideLiquidated
                />
            </TableCell>
        </TableRow>
    );
};

export default ProductRow;
