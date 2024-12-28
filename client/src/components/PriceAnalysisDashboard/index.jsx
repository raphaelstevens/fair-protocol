import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';

// Data constants
const timeSeriesData = [
    { date: '2008-Q1', ammonia: -0.15, gas: 0.15, ets: 0.0 },
    { date: '2008-Q2', ammonia: 0.85, gas: 0.35, ets: 0.05 },
    { date: '2008-Q3', ammonia: 1.45, gas: 0.45, ets: -0.05 },
    { date: '2008-Q4', ammonia: 0.35, gas: 0.15, ets: -0.15 },
    { date: '2009-Q1', ammonia: -0.55, gas: -0.95, ets: -0.25 },
    { date: '2009-Q2', ammonia: -0.45, gas: -0.85, ets: -0.15 },
    { date: '2009-Q3', ammonia: -0.05, gas: -0.45, ets: -0.05 },
    { date: '2009-Q4', ammonia: 0.15, gas: -0.15, ets: -0.15 },
    { date: '2010-Q1', ammonia: 0.25, gas: 0.05, ets: -0.25 },
    { date: '2010-Q2', ammonia: 0.35, gas: 0.15, ets: -0.20 },
    { date: '2010-Q3', ammonia: 0.45, gas: 0.25, ets: -0.15 },
    { date: '2010-Q4', ammonia: 0.95, gas: 0.35, ets: -0.25 },
    { date: '2011-Q1', ammonia: 1.15, gas: 0.35, ets: -0.35 },
    { date: '2011-Q2', ammonia: 1.05, gas: 0.38, ets: -0.85 },
    { date: '2011-Q3', ammonia: 1.15, gas: 0.42, ets: -1.05 },
    { date: '2011-Q4', ammonia: 1.25, gas: 0.45, ets: -1.25 },
    { date: '2012-Q1', ammonia: 1.15, gas: 0.48, ets: -1.55 },
    { date: '2012-Q2', ammonia: 0.95, gas: 0.50, ets: -1.75 },
    { date: '2012-Q3', ammonia: 1.25, gas: 0.52, ets: -1.85 },
    { date: '2012-Q4', ammonia: 1.45, gas: 0.48, ets: -1.75 },
    { date: '2013-Q1', ammonia: 1.35, gas: 0.45, ets: -1.65 },
    { date: '2013-Q2', ammonia: 1.25, gas: 0.42, ets: -1.55 },
    { date: '2013-Q3', ammonia: 0.95, gas: 0.35, ets: -1.45 },
    { date: '2013-Q4', ammonia: 0.85, gas: 0.25, ets: -1.35 },
    { date: '2014-Q1', ammonia: 0.75, gas: 0.15, ets: -1.25 },
    { date: '2014-Q2', ammonia: 0.65, gas: 0.05, ets: -1.15 },
    { date: '2014-Q3', ammonia: 0.45, gas: -0.05, ets: -1.25 },
    { date: '2014-Q4', ammonia: 0.25, gas: -0.15, ets: -1.35 },
    { date: '2015-Q1', ammonia: 0.15, gas: -0.25, ets: -1.25 },
    { date: '2015-Q2', ammonia: -0.25, gas: -0.35, ets: -1.35 },
    { date: '2015-Q3', ammonia: -0.45, gas: -0.38, ets: -1.45 },
    { date: '2015-Q4', ammonia: -0.65, gas: -0.42, ets: -1.35 },
    { date: '2016-Q1', ammonia: -0.85, gas: -0.45, ets: -1.45 },
    { date: '2016-Q2', ammonia: -0.55, gas: -0.35, ets: -1.35 },
    { date: '2016-Q3', ammonia: -0.25, gas: -0.25, ets: -1.25 },
    { date: '2016-Q4', ammonia: -0.15, gas: -0.15, ets: -1.15 },
    { date: '2017-Q1', ammonia: 0.05, gas: -0.05, ets: -0.85 },
    { date: '2017-Q2', ammonia: -0.15, gas: -0.08, ets: -0.65 },
    { date: '2017-Q3', ammonia: -0.25, gas: -0.12, ets: -0.45 },
    { date: '2017-Q4', ammonia: -0.15, gas: -0.05, ets: -0.25 },
    { date: '2018-Q1', ammonia: -0.05, gas: 0.05, ets: 0.15 },
    { date: '2018-Q2', ammonia: 0.05, gas: 0.15, ets: 0.25 },
    { date: '2018-Q3', ammonia: -0.15, gas: 0.25, ets: 0.35 },
    { date: '2018-Q4', ammonia: -0.25, gas: 0.15, ets: 0.45 },
    { date: '2019-Q1', ammonia: -0.35, gas: -0.05, ets: 0.35 },
    { date: '2019-Q2', ammonia: -0.45, gas: -0.25, ets: 0.25 },
    { date: '2019-Q3', ammonia: -0.55, gas: -0.45, ets: 0.35 },
    { date: '2019-Q4', ammonia: -0.75, gas: -0.85, ets: 0.45 },
    { date: '2020-Q1', ammonia: -0.95, gas: -1.15, ets: 0.35 },
    { date: '2020-Q2', ammonia: -1.05, gas: -1.45, ets: 0.25 },
    { date: '2020-Q3', ammonia: -0.85, gas: -1.25, ets: 0.45 },
    { date: '2020-Q4', ammonia: -0.55, gas: -0.85, ets: 0.55 },
    { date: '2021-Q1', ammonia: -0.25, gas: -0.45, ets: 0.75 },
    { date: '2021-Q2', ammonia: 0.45, gas: 0.25, ets: 1.05 },
    { date: '2021-Q3', ammonia: 1.65, gas: 1.85, ets: 1.35 },
    { date: '2021-Q4', ammonia: 2.15, gas: 2.35, ets: 1.65 },
    { date: '2022-Q1', ammonia: 2.45, gas: 2.55, ets: 1.85 },

];


// Theme object
const theme = {
  axes: {
    axisColor: 'var(--chart-axis)',
    axisLabel: 'var(--chart-axis-label)',
    gridLines: 'var(--chart-grid)',
    zeroLine: 'var(--chart-zero-line)',
  },
  data: {
    primary: 'var(--chart-line-1)',
    secondary: 'var(--chart-line-2)',
    tertiary: 'var(--chart-line-3)',
  }
};

// Custom tooltip component
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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={timeSeriesData}
          margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.axes.gridLines} opacity={0.2} />
          <XAxis
            dataKey="date"
            ticks={['2008-Q1', '2012-Q1', '2016-Q1', '2020-Q1', '2022-Q1']}
            stroke={theme.axes.axisColor}
            tickFormatter={(value) => value.split('-')[0]}
            label={{
              value: 'Year',
              position: 'bottom',
              offset: 0,
              style: { fill: theme.axes.axisLabel }
            }}
          />
          <YAxis
            domain={[-3, 3]}
            ticks={[-3, -2, -1, 0, 1, 2, 3]}
            stroke={theme.axes.axisColor}
            label={{
              value: 'Normalized prices',
              angle: -90,
              position: 'center',
              dx: -20,
              style: { fill: theme.axes.axisLabel }
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
            stroke={theme.data.primary}
            strokeWidth={2.5}
            dot={false}
            opacity={opacity.ammonia}
          />
          <Line
            type="monotone"
            dataKey="gas"
            name="TTF Natural Gas"
            stroke={theme.data.secondary}
            strokeWidth={2.5}
            dot={false}
            opacity={opacity.gas}
          />
          <Line
            type="monotone"
            dataKey="ets"
            name="ETS"
            stroke={theme.data.tertiary}
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
            {/* Simple info icon using unicode */}
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