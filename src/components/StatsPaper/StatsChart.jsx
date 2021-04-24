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
import { fillEmptyDays, merge } from '../../helpers/chart';

const StatsChart = ({ datasets, from, to }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                data={fillEmptyDays(merge(datasets), from, to, {
                    zeroFields: datasets.map((dataset) => dataset.key),
                })}
                margin={{
                    left: -20,
                }}
            >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                {datasets.map((dataset) => (
                    <Line
                        name={dataset.name}
                        type="monotone"
                        dataKey={dataset.key}
                        stroke={dataset.color}
                        yAxisId={0}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default StatsChart;
