import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import ProductEventChart from './productEventChart';

const ProductViewPaper = ({ data, from, to }) => {
    return (
        <Box component={Paper} padding={2}>
            <Box>
                <Typography>
                    <strong>Antall produktvisninger</strong>
                </Typography>
                <Typography variant="h4">
                    {data.stats.currentPeriod.productViewCount}
                </Typography>
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
