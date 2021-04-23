import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import formatPrice from '../../../../helpers/formatPrice';
import TurnoverChart from './TurnoverChart';

const TurnoverPaper = ({ data, from, to }) => {
    return (
        <Box component={Paper} padding={2}>
            <Box>
                <Typography>
                    <strong>Omsetning</strong>
                </Typography>
                <Typography variant="h4">
                    {formatPrice(data.stats.currentPeriod.turnover)}
                </Typography>
                <Box marginTop={1}>
                    Estimert margin:{' '}
                    {formatPrice(data.stats.currentPeriod.estimatedMargin)}
                    {data.stats.currentPeriod
                        .numberOfProductsMissingForEstimation !== 0 &&
                        `(Mangler pris på ${data.stats.currentPeriod.numberOfProductsMissingForEstimation} produkter)`}
                </Box>
            </Box>
            <Box marginY={2}>
                <strong>Omsetning over tid</strong>
            </Box>
            <TurnoverChart
                dataset={data.stats.currentPeriod.byDay.map((bd) => ({
                    date: bd.date,
                    value: bd.turnover.sum,
                }))}
                from={from}
                to={to}
            />
        </Box>
    );
};

export default TurnoverPaper;
