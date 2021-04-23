import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import ProductEventChart from './productEventChart';
import getDiffInPresent from '../../../../helpers/getDiffInPresent';

const ProductViewPaper = ({ data, from, to }) => {
    const diff = getDiffInPresent(
        data.stats.currentPeriod.productViewCount,
        data.stats.previousPeriod.productViewCount
    );

    return (
        <Box component={Paper} padding={2}>
            <Box>
                <Typography>
                    <strong>Antall produktvisninger</strong>
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Typography variant="h4">
                            {data.stats.currentPeriod.productViewCount}
                        </Typography>
                    </Box>
                    {diff !== 0 && (
                        <Box color={diff > 0 ? 'success.main' : 'error.main'}>
                            <Typography variant="h5">
                                {diff > 0 ? '+' : '-'}{' '}
                                {Math.abs(diff * 100).toFixed(2)}%
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box marginY={2}>
                <strong>Produkthendelser over tid</strong>
            </Box>
            <ProductEventChart
                period={data.stats.currentPeriod}
                from={from}
                to={to}
            />
        </Box>
    );
};

export default ProductViewPaper;
