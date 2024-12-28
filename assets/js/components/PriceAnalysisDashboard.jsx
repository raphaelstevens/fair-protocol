import React, { useState } from 'react';
import styles from './PriceAnalysisDashboard.module.css';
import infoIcon from '../static/icons/info.svg'; // Icône "info" importée



import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';



// Data constants
const timeSeriesData = [
    { date: '2008-Q1', ammonia: -0.15, gas: 0.15, ets: 0.0 },
    { date: '2021-Q4', ammonia: 2.15, gas: 2.35, ets: 1.65 },
    { date: '2022-Q1', ammonia: 2.45, gas: 2.55, ets: 1.85 }

];

const comparisons = {
  ammonia_gas: {
    title: 'Ammonia vs Natural Gas',
    xKey: 'ammonia',
    yKey: 'gas',
    description: 'Strong positive correlation shows how ammonia prices (fertilizer production) are deeply tied to natural gas prices, highlighting our agricultural dependency on fossil fuels.',
  },
  ammonia_ets: {
    title: 'Ammonia vs ETS',
    xKey: 'ammonia',
    yKey: 'ets',
    description: 'The negative correlation suggests current carbon pricing mechanisms (ETS) have limited influence on ammonia production decisions.',
  },
  gas_ets: {
    title: 'Natural Gas vs ETS',
    xKey: 'gas',
    yKey: 'ets',
    description: 'The negative correlation indicates carbon prices are not effectively influencing natural gas market dynamics.',
  },
};

// Theme object
const theme = {
  core: {
    background: 'var(--chart-bg)',
    titleText: 'var(--chart-title-text)',
    subtitleText: 'var(--chart-subtitle-text)',
  },
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
  },
  info: {
    tooltipBg: 'var(--chart-tooltip-bg)',
    tooltipText: 'var(--chart-tooltip-text)',
    tooltipBorder: 'var(--chart-tooltip-border)',
  },
  buttons: {
  background: {
    default: 'var(--chart-button-bg)',
    select: 'var(--chart-button-bg-select)'
  },
  text: {
    default: 'var(--chart-button-text)',
    select: 'var(--chart-button-text-select)'
  },
 },
  alert: {
    background: 'var(--chart-annotation-bg)',
    text: 'var(--chart-annotation-text)',
    border: 'var(--chart-annotation-line)',
  },
};
// Utility functions
const calculateRegression = (data, xKey, yKey) => {
  const x = data.map(d => d[xKey]);
  const y = data.map(d => d[yKey]);
  const n = x.length;
  
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;
  
  let numerator = 0;
  let xSS = 0;
  let ySS = 0;
  
  for (let i = 0; i < n; i++) {
    const xDev = x[i] - xMean;
    const yDev = y[i] - yMean;
    numerator += xDev * yDev;
    xSS += xDev * xDev;
    ySS += yDev * yDev;
  }
  
  const correlation = numerator / Math.sqrt(xSS * ySS);
  const slope = numerator / xSS;
  const intercept = yMean - slope * xMean;
  
  const yPred = x.map(xi => slope * xi + intercept);
  const ssRes = y.reduce((sum, yi, i) => sum + Math.pow(yi - yPred[i], 2), 0);
  const ssTot = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
  const rSquared = 1 - (ssRes / ssTot);
  
  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  
  return {
    regressionLine: [
      { x: xMin, y: slope * xMin + intercept },
      { x: xMax, y: slope * xMax + intercept }
    ],
    rSquared,
    correlation,
  };
};

const prepareScatterData = (data, xKey, yKey) => {
  return data.map((d, i) => ({
    x: d[xKey],
    y: d[yKey],
    date: d.date,
    isRecent: i > data.length - 8,
  }));
};

// Custom tooltip components
const TimeSeriesToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
        <p className="font-semibold">{label}</p>
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

const ScatterTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
        <p className="font-semibold">{payload[0].payload.date}</p>
        <p>X: {payload[0].value.toFixed(2)}</p>
        <p>Y: {payload[1].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

// Main component
const PriceAnalysisDashboard = () => {
  const [selectedView, setSelectedView] = useState('time-series');
  const [selectedComparison, setSelectedComparison] = useState('ammonia_gas');
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
    <div className="h-[500px]">
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
          <Tooltip content={<TimeSeriesToolTip />} />
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

  const renderCorrelationChart = () => {
    const comparison = comparisons[selectedComparison];
    const scatterData = prepareScatterData(timeSeriesData, comparison.xKey, comparison.yKey);
    const regressionResults = calculateRegression(timeSeriesData, comparison.xKey, comparison.yKey);


  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <h1 className={styles["card-title"]}>Price Analysis Dashboard</h1>
        <div>
          <button
            onClick={() => setSelectedView('time-series')}
            className={`${styles.button} ${
              selectedView === 'time-series'
                ? styles["button-selected"]
                : styles["button-default"]
            }`}
          >
            Time Series
          </button>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`${styles.button} ${
              showInfo
                ? styles["button-selected"]
                : styles["button-default"]
            }`}
          >
            <img
              src={infoIcon}
              alt="Info"
              style={{ height: '24px', width: '24px', marginRight: '8px' }}
            />
            Informations
          </button>
        </div>
      </div>
      <div className={styles["card-content"]}>
        {showInfo && (
          <div className={styles.alert}>
            <p className={styles["alert-description"]}>
              This time series shows the relationship between commodity prices over time.
            </p>
          </div>
        )}
        {renderTimeSeriesChart()}
        <p className={styles["text-right"]}>Data source: Bloomberg</p>
      </div>
    </div>
  );
};

export default PriceAnalysisDashboard;
