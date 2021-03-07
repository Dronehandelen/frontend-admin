import React from 'react';
import { gql } from '@apollo/client';
import Card from '../../../../components/Card.jsx';
import formatPrice from '../../../../helpers/formatPrice.js';

export const totalTurnoverFragment = gql`
    fragment TotalTurnoverFragment on Stats {
        turnover
    }
`;

const TotalTurnover = ({ stats }) => {
    return (
        <Card color="green" className="text-center">
            <div style={{ fontSize: 24 }}>kr {formatPrice(stats.turnover)}</div>
            <div>
                <strong>Omsetning uten frakt</strong>
            </div>
        </Card>
    );
};

export default TotalTurnover;
