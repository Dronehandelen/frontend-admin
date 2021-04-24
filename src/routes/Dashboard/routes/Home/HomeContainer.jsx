import React from 'react';
import Home from './Home.jsx';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { lastReviewsFragment } from './LastReviews.jsx';
import { lastAddToCartFragment } from './LastAddToCart.jsx';
import { dashboardProductEventChartFragment } from './ProductViewPaper.jsx';

export const QUERY_HOME_DATA = gql`
    query Stats(
        $from: DateTime!
        $to: DateTime!
        $startPreviousPeriod: DateTime!
    ) {
        ...LastReviews
        stats {
            warehouseValue
            ...LastAddToCartFragment
            currentPeriod: period(from: $from, to: $to) {
                ...PeriodStatsForCompare
                estimatedMargin
                numberOfProductsMissingForEstimation
                ...DashboardProductEventChartData
                byDay {
                    date
                    turnover {
                        count
                        sum
                    }
                    session {
                        count
                    }
                }
            }
            previousPeriod: period(from: $startPreviousPeriod, to: $from) {
                ...PeriodStatsForCompare
            }
        }
    }
    fragment PeriodStatsForCompare on PeriodStats {
        turnover
        productViewCount: productEventsCount(eventName: "view")
        session {
            count
        }
    }
    ${lastReviewsFragment}
    ${lastAddToCartFragment}
    ${dashboardProductEventChartFragment}
`;

const StatsContainer = () => {
    const [from, setFrom] = React.useState(
        moment().startOf('day').subtract(31, 'days')
    );
    const [to, setTo] = React.useState(moment().add(1, 'day').startOf('day'));

    const startPreviousPeriod = React.useMemo(() => {
        return from.clone().subtract({
            milliseconds: Math.abs(to.diff(from)),
        });
    }, [from, to]);

    return (
        <Home
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
            queryHookData={useQuery(QUERY_HOME_DATA, {
                variables: {
                    from,
                    to,
                    startPreviousPeriod,
                },
            })}
        />
    );
};

export default StatsContainer;
