import React from 'react';
import { Box } from '@material-ui/core';
import formatPrice from '../../../../helpers/formatPrice';
import { MainNumber, StatsChart } from '../../../../components/StatsPaper';
import StatsPaper from '../../../../components/StatsPaper';

const TurnoverPaper = ({ data, from, to }) => {
    return (
        <StatsPaper>
            <Box>
                <MainNumber
                    title="Omsetning"
                    nowFormatted={formatPrice(
                        data.stats.currentPeriod.turnover
                    )}
                    nowNumber={data.stats.currentPeriod.turnover}
                    beforeNumber={data.stats.previousPeriod.turnover}
                />
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
            <StatsChart
                datasets={[
                    {
                        key: 'turnover',
                        dataset: data.stats.currentPeriod.byDay.map((bd) => ({
                            date: bd.date,
                            value: bd.turnover.sum,
                        })),
                    },
                ]}
                from={from}
                to={to}
            />
        </StatsPaper>
    );
};

export default TurnoverPaper;
