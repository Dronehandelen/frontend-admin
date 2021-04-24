import React from 'react';
import { Box } from '@material-ui/core';
import StatsPaper, {
    MainNumber,
    StatsChart,
} from '../../../../components/StatsPaper';
import { gql } from '@apollo/client';

export const dashboardProductEventChartFragment = gql`
    fragment DashboardProductEventChartData on PeriodStats {
        productViewCountPerDay: productEventsCountPerDay(eventName: "view") {
            date
            count
        }
        productClickCountPerDay: productEventsCountPerDay(eventName: "click") {
            date
            count
        }
        productAddToCartCountPerDay: productEventsCountPerDay(
            eventName: "addToCart"
        ) {
            date
            count
        }
    }
`;

const ProductViewPaper = ({ data, from, to }) => {
    return (
        <StatsPaper>
            <Box>
                <MainNumber
                    title="Antall produktvisninger"
                    nowNumber={data.stats.currentPeriod.productViewCount}
                    beforeNumber={data.stats.previousPeriod.productViewCount}
                />
            </Box>
            <Box marginY={2}>
                <strong>Produkthendelser over tid</strong>
            </Box>
            <StatsChart
                datasets={[
                    {
                        key: 'productView',
                        color: '#387908',
                        dataset: data.stats.currentPeriod.productViewCountPerDay.map(
                            (pvcpd) => ({
                                date: pvcpd.date,
                                value: pvcpd.count,
                            })
                        ),
                    },
                    {
                        key: 'productClick',
                        color: 'red',
                        dataset: data.stats.currentPeriod.productClickCountPerDay.map(
                            (pvcpd) => ({
                                date: pvcpd.date,
                                value: pvcpd.count,
                            })
                        ),
                    },
                    {
                        key: 'addToCart',
                        color: 'blue',
                        dataset: data.stats.currentPeriod.productAddToCartCountPerDay.map(
                            (pvcpd) => ({
                                date: pvcpd.date,
                                value: pvcpd.count,
                            })
                        ),
                    },
                ]}
                from={from}
                to={to}
            />
        </StatsPaper>
    );
};

export default ProductViewPaper;
