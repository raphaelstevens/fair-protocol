import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const timeSeriesData = [
    { date: '2008-Q1', ammonia: -0.15, gas: 0.15, ets: 0.0 },
    { date: '2012-Q1', ammonia: 1.15, gas: 0.48, ets: -1.55 },
    { date: '2016-Q1', ammonia: -0.85, gas: -0.45, ets: -1.45 },
    { date: '2020-Q1', ammonia: -0.95, gas: -1.15, ets: 0.35 },
    { date: '2022-Q1', ammonia: 2.45, gas: 2.55, ets: 1.85 }
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
                <p className="font-semibold mb-2">{label}</p>
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

    const axisStyle = {
        stroke: '#718096',
        fill: '#1B365D'
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tableau de bord d'analyse des prix</h1>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`px-4 py-2 rounded-md flex items-center ${
                        showInfo ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                >
                    <span className="mr-2">ℹ️</span>
                    Informations
                </button>
            </div>

            <div>
                {showInfo && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p className="text-blue-700">
                            Cette série temporelle montre la relation entre les prix des matières premières au fil du temps.
                        </p>
                    </div>
                )}
                <div className="bg-gray-50 p-6 rounded-lg mb-6" style={{ height: '500px' }}>
                    <ResponsiveContainer>
                        <LineChart
                            data={timeSeriesData}
                            margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                ticks={['2008-Q1', '2012-Q1', '2016-Q1', '2020-Q1', '2022-Q1']}
                                tickFormatter={(value) => value.split('-')[0]}
                                style={axisStyle}
                                label={{
                                    value: 'Année',
                                    position: 'bottom',
                                    offset: 0,
                                    style: { ...axisStyle }
                                }}
                            />
                            <YAxis
                                domain={[-3, 3]}
                                ticks={[-3, -2, -1, 0, 1, 2, 3]}
                                style={axisStyle}
                                label={{
                                    value: 'Prix normalisés',
                                    angle: -90,
                                    position: 'center',
                                    dx: -20,
                                    style: { ...axisStyle }
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
                                name="Ammoniac Europe de l'Ouest"
                                stroke="#1f77b4"
                                strokeWidth={2.5}
                                dot={false}
                                opacity={opacity.ammonia}
                            />
                            <Line
                                type="monotone"
                                dataKey="gas"
                                name="Gaz naturel TTF"
                                stroke="#ff7f0e"
                                strokeWidth={2.5}
                                dot={false}
                                opacity={opacity.gas}
                            />
                            <Line
                                type="monotone"
                                dataKey="ets"
                                name="ETS"
                                stroke="#2ca02c"
                                strokeWidth={2.5}
                                dot={false}
                                opacity={opacity.ets}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-right text-gray-600">Source des données : Bloomberg</p>
            </div>
        </div>
    );
};

export default PriceAnalysisDashboard;