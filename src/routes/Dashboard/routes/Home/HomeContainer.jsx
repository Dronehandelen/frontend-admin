import React from 'react';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import Home from './Home.jsx';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { totalTurnoverFragment } from './TotalTurnover.jsx';
import { lastReviewsFragment } from './LastReviews.jsx';
import { warehouseValueFragment } from './WarehouseValue.jsx';
import { lastAddToCartFragment } from './LastAddToCart.jsx';
import { dashboardProductEventChartFragment } from './productEventChart.jsx';
import { totalMarginFragment } from './TotalMargin.jsx';

export const QUERY_HOME_DATA = gql`
    query Stats($from: DateTime!, $to: DateTime!) {
        ...LastReviews
        stats {
            ...TotalTurnoverFragment
            ...WarehouseValueFragment
            ...LastAddToCartFragment
            currentPeriod: period(from: $from, to: $to) {
                ...DashboardProductEventChartData
                ...TotalMarginFragment
            }
        }
    }
    ${totalTurnoverFragment}
    ${lastReviewsFragment}
    ${warehouseValueFragment}
    ${lastAddToCartFragment}
    ${dashboardProductEventChartFragment}
    ${totalMarginFragment}
`;

const StatsContainer = () => {
    const to = moment().endOf('day');
    const from = moment().subtract(31, 'days').endOf('day');

    return (
        <DefaultHookQuery
            queryHookData={useQuery(QUERY_HOME_DATA, {
                variables: {
                    from,
                    to,
                },
            })}
        >
            {({ data }) => <Home data={data} from={from} to={to} />}
        </DefaultHookQuery>
    );
};

export default StatsContainer;
