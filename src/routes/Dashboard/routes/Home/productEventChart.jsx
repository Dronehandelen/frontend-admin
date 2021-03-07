import React from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import moment from 'moment';
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

const fillEmptyDays = (data, from, to, { zeroFields }) => {
    const date = from.clone().startOf('day');
    const actualTo = to.clone().endOf('day');

    const newData = [];

    while (date.isBefore(actualTo)) {
        const stored = data.find((d) => moment(d.date).isSame(date));

        newData.push(
            zeroFields.reduce(
                (result, field) => {
                    if (result[field] == null) {
                        result[field] = 0;
                    }
                    return result;
                },
                {
                    ...stored,
                    date: date.format('DD. MMM.'),
                }
            )
        );
        date.add(1, 'day');
    }

    return newData;
};

const merge = (datasets) => {
    const byDate = datasets.reduce(
        (final, { key, dataset }) =>
            dataset.reduce((final, entry) => {
                if (!final[entry.date]) {
                    final[entry.date] = {
                        date: entry.date,
                    };
                }
                final[entry.date][key] = entry.count;
                return final;
            }, final),
        {}
    );

    return Object.values(byDate);
};

const ProductEventChart = ({ period, from, to }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                data={fillEmptyDays(
                    merge([
                        {
                            key: 'productView',
                            dataset: period.productViewCountPerDay,
                        },
                        {
                            key: 'productClick',
                            dataset: period.productClickCountPerDay,
                        },
                        {
                            key: 'addToCart',
                            dataset: period.productAddToCartCountPerDay,
                        },
                    ]),
                    from,
                    to,
                    {
                        zeroFields: [
                            'productView',
                            'productClick',
                            'addToCart',
                        ],
                    }
                )}
                margin={{
                    top: 5,
                    right: 20,
                    left: 10,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <Line
                    name="Views"
                    type="monotone"
                    dataKey="productView"
                    stroke="#387908"
                    yAxisId={0}
                />
                <Line
                    name="Click"
                    type="monotone"
                    dataKey="productClick"
                    stroke="red"
                    yAxisId={0}
                />
                <Line
                    name="Add to cart"
                    type="monotone"
                    dataKey="addToCart"
                    stroke="blue"
                    yAxisId={0}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ProductEventChart;
