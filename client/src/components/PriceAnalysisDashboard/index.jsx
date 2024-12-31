import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

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
    { date: '2022-Q1', ammonia: 2.45, gas: 2.55, ets: 1.85 }

];

const comparisons = {
    ammonia_gas: {
        title: 'Ammonia vs Natural Gas',
        xKey: 'ammonia',
        yKey: 'gas',
        description: 'La forte corrélation positive montre comment les prix de l\'ammoniac (production d\'engrais) sont étroitement liés aux prix du gaz naturel, soulignant notre dépendance agricole aux combustibles fossiles.',
    },
    ammonia_ets: {
        title: 'Ammonia vs ETS',
        xKey: 'ammonia',
        yKey: 'ets',
        description: 'La corrélation négative suggère que les mécanismes actuels de tarification du carbone (ETS) ont une influence limitée sur les décisions de production d\'ammoniac.',
    },
    gas_ets: {
        title: 'Natural Gas vs ETS',
        xKey: 'gas',
        yKey: 'ets',
        description: 'La corrélation négative indique que les prix du carbone n\'influencent pas efficacement la dynamique du marché du gaz naturel.',
    }
};

// Utility function for regression calculation
const calculateRegression = (data, xKey, yKey) => {
    const x = data.map(d => d[xKey]);
    const y = data.map(d => d[yKey]);
    const n = x.length;
    
    const xMean = x.reduce((sum, val) => sum + val, 0) / n;
    const yMean = y.reduce((sum, val) => sum + val, 0) / n;
    
    let numerator = 0;
    let denominator = 0;
    
    for (let i = 0; i < n; i++) {
        numerator += (x[i] - xMean) * (y[i] - yMean);
        denominator += Math.pow(x[i] - xMean, 2);
    }
    
    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;
    
    const xMin = Math.min(...x);
    const xMax = Math.max(...x);
    
    return [
        { x: xMin, y: slope * xMin + intercept },
        { x: xMax, y: slope * xMax + intercept }
    ];
};

// Custom tooltips
const TimeSeriesTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'var(--chart-tooltip-bg)',
                border: '1px solid var(--chart-tooltip-border)',
                padding: '1rem',
                borderRadius: '0.375rem'
            }}>
                <p style={{ color: 'var(--chart-tooltip-text)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {label}
                </p>
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
            <div style={{
                background: 'var(--chart-tooltip-bg)',
                border: '1px solid var(--chart-tooltip-border)',
                padding: '1rem',
                borderRadius: '0.375rem'
            }}>
                <p style={{ color: 'var(--chart-tooltip-text)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {payload[0].payload.date}
                </p>
                <p style={{ color: 'var(--chart-tooltip-text)' }}>X: {payload[0].value.toFixed(2)}</p>
                <p style={{ color: 'var(--chart-tooltip-text)' }}>Y: {payload[1].value.toFixed(2)}</p>
            </div>
        );
    }
    return null;
};

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

    const buttonStyle = {
        backgroundColor: 'var(--chart-button-bg)',
        color: 'var(--chart-button-text)',
        transition: 'all 0.2s ease',
        padding: '0.5rem 1.5rem',
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem',        // Marge fixe entre les boutons
        marginTop: '0.125rem',      // 2px
        marginBottom: '1.375rem'    // 22px
    };

    const selectedButtonStyle = {
        backgroundColor: 'var(--chart-button-bg-select)',
        color: 'var(--chart-button-text-select)',
        transition: 'all 0.2s ease',
        padding: '0.5rem 1.5rem',
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem',        // Marge fixe entre les boutons
        marginTop: '0.125rem',      // 2px
        marginBottom: '1.375rem'    // 22px
    };

    const renderTimeSeriesChart = () => (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                data={timeSeriesData}
                margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis
                    dataKey="date"
                    ticks={['2008-Q1', '2012-Q1', '2016-Q1', '2020-Q1', '2022-Q1']}
                    tickFormatter={(value) => value.split('-')[0]}
                    stroke="var(--chart-axis)"
                    label={{
                        value: 'Année',
                        position: 'bottom',
                        offset: 0,
                        style: { fill: 'var(--chart-axis)' }
                    }}
                />
                <YAxis
                    domain={[-3, 3]}
                    ticks={[-3, -2, -1, 0, 1, 2, 3]}
                    stroke="var(--chart-axis)"
                    label={{
                        value: 'Prix normalisés',
                        angle: -90,
                        position: 'center',
                        dx: -20,
                        style: { fill: 'var(--chart-axis)' }
                    }}
                />
                <Tooltip content={<TimeSeriesTooltip />} />
                <Legend
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    verticalAlign="top"
                    height={36}
                />
                <Line
                    type="monotone"
                    dataKey="ammonia"
                    name="Ammoniac Europe de l'Ouest"
                    stroke="var(--chart-line-1)"
                    strokeWidth={2.5}
                    dot={false}
                    opacity={opacity.ammonia}
                />
                <Line
                    type="monotone"
                    dataKey="gas"
                    name="Gaz naturel TTF"
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
    );

    const renderCorrelationChart = () => {
        const comparison = comparisons[selectedComparison];
        const scatterData = timeSeriesData.map(d => ({
            x: d[comparison.xKey],
            y: d[comparison.yKey],
            date: d.date
        }));
        const regressionLine = calculateRegression(timeSeriesData, comparison.xKey, comparison.yKey);

        return (
            <ResponsiveContainer width="100%" height={500}>
                <ScatterChart
                    margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                    <XAxis
                        type="number"
                        dataKey="x"
                        name={comparison.xKey}
                        stroke="var(--chart-axis)"
                        domain={[-3, 3]}
                        label={{
                            value: comparison.xKey.charAt(0).toUpperCase() + comparison.xKey.slice(1),
                            position: 'bottom',
                            offset: 0,
                            style: { fill: 'var(--chart-axis)' }
                        }}
                    />
                    <YAxis
                        type="number"
                        dataKey="y"
                        name={comparison.yKey}
                        stroke="var(--chart-axis)"
                        domain={[-3, 3]}
                        label={{
                            value: comparison.yKey.charAt(0).toUpperCase() + comparison.yKey.slice(1),
                            angle: -90,
                            position: 'left',
                            offset: -10,
                            style: { fill: 'var(--chart-axis)' }
                        }}
                    />
                    <Tooltip content={<ScatterTooltip />} />
                    <Scatter data={scatterData} fill="var(--chart-line-1)" />
                    <Scatter
                        data={regressionLine}
                        line={{ stroke: 'var(--chart-line-2)', strokeWidth: 2 }}
                        shape={() => null}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div style={{ background: 'var(--theme)', padding: '1.5rem', maxWidth: '72rem', margin: '0 auto' }}>
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-base font-medium mb-6" style={{ color: 'var(--primary)' }}>
                        Tableau de bord d'analyse des prix
                    </h3>
                    <div className="flex">
                        <button
                            onClick={() => setSelectedView('time-series')}
                            className="px-6 rounded-md"
                            style={selectedView === 'time-series' ? selectedButtonStyle : buttonStyle}
                        >
                            Série temporelle
                        </button>
                        <button
                            onClick={() => setSelectedView('correlation')}
                            className="px-6 rounded-md"
                            style={selectedView === 'correlation' ? selectedButtonStyle : buttonStyle}
                        >
                            Analyse de corrélation
                        </button>
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            className="px-6 rounded-md flex items-center gap-2"
                            style={showInfo ? selectedButtonStyle : buttonStyle}
                        >
                            <span>ℹ️</span>
                            Informations
                        </button>
                    </div>
                </div>

                {selectedView === 'correlation' && (
                    <div className="flex gap-2">
                        {Object.keys(comparisons).map((key) => (
                            <button
                                key={key}
                                onClick={() => setSelectedComparison(key)}
                                className="px-6 rounded-md"
                                style={selectedComparison === key ? selectedButtonStyle : buttonStyle}
                            >
                                {comparisons[key].title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {showInfo && (
                <div style={{ 
                    background: 'var(--chart-annotation-bg)',
                    borderLeft: '4px solid var(--chart-annotation-line)',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <p style={{ color: 'var(--chart-annotation-text)' }}>
                        {selectedView === 'correlation' 
                            ? comparisons[selectedComparison].description
                            : "Cette série temporelle montre la relation entre les prix des matières premières au fil du temps."}
                    </p>
                </div>
            )}

            <div style={{ 
                background: 'var(--entry)',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
            }}>
                {selectedView === 'time-series' ? renderTimeSeriesChart() : renderCorrelationChart()}
            </div>

            <p style={{ 
                textAlign: 'right',
                color: 'var(--secondary)'
            }}>
                Source des données : Bloomberg
            </p>
        </div>
    );
};

export default PriceAnalysisDashboard;