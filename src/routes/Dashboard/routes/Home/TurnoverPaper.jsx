import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import formatPrice from '../../../../helpers/formatPrice';
import TurnoverChart from './TurnoverChart';
import getDiffInPresent from '../../../../helpers/getDiffInPresent';

const TurnoverPaper = ({ data, from, to }) => {
    const diff = getDiffInPresent(
        data.stats.currentPeriod.turnover,
        data.stats.previousPeriod.turnover
    );
    return (
        <Box component={Paper} padding={2}>
            <Box>
                <Typography>
                    <strong>Omsetning</strong>
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Typography variant="h4">
                            {formatPrice(data.stats.currentPeriod.turnover)}
                        </Typography>
                    </Box>
                    {diff !== 0 && (
                        <Box color={diff > 0 ? 'success.main' : 'error.main'}>
                            <Typography variant="h5">
                                {diff > 0 && '+'} {(diff * 100).toFixed(2)}%
                            </Typography>
                        </Box>
                    )}
                </Box>
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
