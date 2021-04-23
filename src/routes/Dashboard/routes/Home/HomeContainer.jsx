import React from 'react';
import Home from './Home.jsx';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { lastReviewsFragment } from './LastReviews.jsx';
import { lastAddToCartFragment } from './LastAddToCart.jsx';
import { dashboardProductEventChartFragment } from './productEventChart.jsx';

export const QUERY_HOME_DATA = gql`
    query Stats($from: DateTime!, $to: DateTime!) {
        ...LastReviews
        stats {
            warehouseValue
            ...LastAddToCartFragment
            currentPeriod: period(from: $from, to: $to) {
                turnover
                estimatedMargin
                numberOfProductsMissingForEstimation
                ...DashboardProductEventChartData
                productViewCount: productEventsCount(eventName: "view")
                byDay {
                    date
                    turnover {
                        count
                        sum
                    }
                }
            }
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
                },
            })}
        />
    );
};

export default StatsContainer;
