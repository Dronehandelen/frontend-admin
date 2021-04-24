import React from 'react';
import { Box } from '@material-ui/core';
import StatsPaper, {
    MainNumber,
    StatsChart,
} from '../../../../components/StatsPaper';

const SessionPaper = ({ data, from, to }) => {
    return (
        <StatsPaper>
            <Box>
                <MainNumber
                    title="Økter"
                    nowNumber={data.stats.currentPeriod.session.count}
                    beforeNumber={data.stats.previousPeriod.session.count}
                />
            </Box>
            <Box marginY={2}>
                <strong>Økter over tid</strong>
            </Box>
            <StatsChart
                datasets={[
                    {
                        key: 'sessionCount',
                        dataset: data.stats.currentPeriod.byDay.map((bd) => ({
                            date: bd.date,
                            value: bd.session.count,
                        })),
                    },
                ]}
                from={from}
                to={to}
            />
        </StatsPaper>
    );
};

export default SessionPaper;
