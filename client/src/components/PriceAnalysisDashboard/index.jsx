import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';

const timeSeriesData = [
    { date: '2008-Q1', ammonia: -0.15, gas: 0.15, ets: 0.0 },
    { date: '2008-Q2', ammonia: 0.85, gas: 0.35, ets: 0.05 },
    // ... rest of the data
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p className={styles['tooltip-title']}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value.toFixed(2)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const PriceAnalysisDashboard = () => {
    const [showInfo, setShowInfo] = useState(false);
    const [opacity, setOpacity] = useState({
        ammonia: 1,
        gas: 1,
        ets: 1
    });

    const handleMouseEnter = (dataKey) => {
        const newOpacity = { ammonia: 0.3, gas: 0.3, ets: 0.3 };
        newOpacity[dataKey] = 1;
        setOpacity(newOpacity);
    };

    const handleMouseLeave = () => {
        setOpacity({ ammonia: 1, gas: 1, ets: 1 });
    };

    const renderTimeSeriesChart = () => (
        <div className={styles['chart-container']}>
            <ResponsiveContainer>
                <LineChart
                    data={timeSeriesData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
                >
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="var(--chart-grid)" 
                        opacity={0.2} 
                    />
                    <XAxis
                        dataKey="date"
                        ticks={['2008-Q1', '2012-Q1', '2016-Q1', '2020-Q1', '2022-Q1']}
                        stroke="var(--chart-axis)"
                        tickFormatter={(value) => value.split('-')[0]}
                        label={{
                            value: 'Year',
                            position: 'bottom',
                            offset: 0,
                            style: { fill: 'var(--chart-axis-label)' }
                        }}
                    />
                    <YAxis
                        domain={[-3, 3]}
                        ticks={[-3, -2, -1, 0, 1, 2, 3]}
                        stroke="var(--chart-axis)"
                        label={{
                            value: 'Normalized prices',
                            angle: -90,
                            position: 'center',
                            dx: -20,
                            style: { fill: 'var(--chart-axis-label)' }
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        verticalAlign="top"
                        height={36}
                    />
                    <Line
                        type="monotone"
                        dataKey="ammonia"
                        name="Western Europe Ammonia"
                        stroke="var(--chart-line-1)"
                        strokeWidth={2.5}
                        dot={false}
                        opacity={opacity.ammonia}
                    />
                    <Line
                        type="monotone"
                        dataKey="gas"
                        name="TTF Natural Gas"
                        stroke="var(--chart-line-2)"
                        strokeWidth={2.5}
                        dot={false}
                        opacity={opacity.gas}
                    />
                    <Line
                        type="monotone"
                        dataKey="ets"
                        name="ETS"
                        stroke="var(--chart-line-3)"
                        strokeWidth={2.5}
                        dot={false}
                        opacity={opacity.ets}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    return (
        <div className={styles.card}>
            <div className={styles['card-header']}>
                <h1 className={styles['card-title']}>Price Analysis Dashboard</h1>
                <div>
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        className={`${styles.button} ${
                            showInfo ? styles['button-selected'] : styles['button-default']
                        }`}
                    >
                        <span style={{ marginRight: '8px' }}>ℹ️</span>
                        Informations
                    </button>
                </div>
            </div>

            <div className={styles['card-content']}>
                {showInfo && (
                    <div className={styles.alert}>
                        <p className={styles['alert-description']}>
                            This time series shows the relationship between commodity prices over time.
                        </p>
                    </div>
                )}
                {renderTimeSeriesChart()}
                <p className={styles['text-right']}>Data source: Bloomberg</p>
            </div>
        </div>
    );
};

export default PriceAnalysisDashboard;