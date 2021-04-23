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
import { fillEmptyDays, merge } from '../../../../helpers/chart';

const TurnoverChart = ({ dataset, from, to }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                data={fillEmptyDays(
                    merge([
                        {
                            key: 'turnover',
                            dataset,
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
                    left: -20,
                }}
            >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <Line
                    name="Omsetning"
                    type="monotone"
                    dataKey="turnover"
                    stroke="#387908"
                    yAxisId={0}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TurnoverChart;
