import React from 'react';
import { gql } from '@apollo/client';
import Card from '../../../../components/Card.jsx';
import formatPrice from '../../../../helpers/formatPrice.js';

export const warehouseValueFragment = gql`
    fragment WarehouseValueFragment on Stats {
        warehouseValue
    }
`;

const WarehouseValue = ({ stats }) => {
    return (
        <Card color="yellow" className="text-center">
            <div style={{ fontSize: 24 }}>
                kr {formatPrice(stats.warehouseValue)}
            </div>
            <div>
                <strong>lagerverdi</strong>
            </div>
        </Card>
    );
};

export default WarehouseValue;
