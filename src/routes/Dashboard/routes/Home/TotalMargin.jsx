import React from 'react';
import { gql } from '@apollo/client';
import Card from '../../../../components/Card.jsx';
import formatPrice from '../../../../helpers/formatPrice.js';

export const totalMarginFragment = gql`
    fragment TotalMarginFragment on PeriodStats {
        estimatedMargin
        numberOfProductsMissingForEstimation
    }
`;

const TotalMargin = ({ period }) => {
    return (
        <Card color="blue" className="text-center">
            <div style={{ fontSize: 24 }}>
                kr {formatPrice(period.estimatedMargin)}
            </div>
            <div>
                <strong>Estimert margin siste 31 dager</strong>
            </div>

            {period.numberOfProductsMissingForEstimation && (
                <div>
                    <i>
                        Savner pris på{' '}
                        {period.numberOfProductsMissingForEstimation} produkter
                    </i>
                </div>
            )}
        </Card>
    );
};

export default TotalMargin;
