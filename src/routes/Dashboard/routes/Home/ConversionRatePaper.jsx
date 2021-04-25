import React from 'react';
import { Box, Typography } from '@material-ui/core';
import StatsPaper, { MainNumber } from '../../../../components/StatsPaper';
import getDiffInPresent from '../../../../helpers/getDiffInPresent';

const SessionPaper = ({ data }) => {
    const diffAddToCartSessions = getDiffInPresent(
        data.stats.currentPeriod.conversionRate.addToCartSessions.rate,
        data.stats.previousPeriod.conversionRate.addToCartSessions.rate
    );
    return (
        <StatsPaper>
            <Box>
                <MainNumber
                    title="Konverteringsraten"
                    nowFormatted={`${(
                        data.stats.currentPeriod.conversionRate.allSessions
                            .rate * 100
                    ).toFixed(1)}%`}
                    nowNumber={
                        data.stats.currentPeriod.conversionRate.allSessions.rate
                    }
                    beforeNumber={
                        data.stats.previousPeriod.conversionRate.allSessions
                            .rate
                    }
                />
            </Box>
            <Box marginTop={2} display="flex" justifyContent="space-between">
                <table style={{ width: '100%' }}>
                    <tr>
                        <td>
                            <Box>
                                <strong>Lagt til handlevogn</strong>
                            </Box>
                            <Box>
                                {
                                    data.stats.currentPeriod.conversionRate
                                        .addToCartSessions.count
                                }{' '}
                                Økter
                            </Box>
                        </td>
                        <td>
                            <Typography variant="h5" align="right">
                                {(
                                    data.stats.currentPeriod.conversionRate
                                        .addToCartSessions.rate * 100
                                ).toFixed(1)}
                                %
                            </Typography>
                        </td>
                        <td width="90">
                            <Box
                                color={
                                    diffAddToCartSessions > 0
                                        ? 'success.main'
                                        : 'error.main'
                                }
                            >
                                <Typography align="right">
                                    {diffAddToCartSessions > 0 && '+'}{' '}
                                    {(diffAddToCartSessions * 100).toFixed(1)}%
                                </Typography>
                            </Box>
                        </td>
                    </tr>
                </table>
            </Box>
        </StatsPaper>
    );
};

export default SessionPaper;
