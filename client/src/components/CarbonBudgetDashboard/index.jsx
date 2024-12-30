import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const carbonData = [
    { year: 2000, reserves: 580 },
    { year: 2009, reserves: 620 },
    { year: 2019, reserves: 890 },
    { year: 2020, reserves: 910 },
    { year: 2023, reserves: 980 },
    { year: 2024, reserves: 1000 }
];

const BUDGET_1_5C = 500;
const BUDGET_2_0C = 800;

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded shadow-lg border border-gray-200" 
                 style={{ backgroundColor: 'var(--entry)', color: 'var(--primary)' }}>
                <p className="font-semibold mb-2">{label}</p>
                <p style={{ color: 'var(--icon-info)' }}>
                    Réserves: {payload[0].value} Gt CO₂
                </p>
            </div>
        );
    }
    return null;
};

const CarbonBudgetDashboard = () => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="p-6 max-w-6xl mx-auto rounded-lg shadow-lg" 
             style={{ backgroundColor: 'var(--theme)', color: 'var(--primary)' }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Budget Carbone Global</h1>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`px-4 py-2 rounded-md flex items-center ${
                        showInfo ? 'text-white' : ''
                    }`}
                    style={{
                        backgroundColor: showInfo ? 'var(--icon-info)' : 'var(--entry)',
                        color: showInfo ? 'white' : 'var(--primary)'
                    }}
                >
                    <span className="mr-2">ℹ️</span>
                    Informations
                </button>
            </div>

            {showInfo && (
                <div className="p-4 mb-6 border-l-4 rounded" 
                     style={{ 
                         backgroundColor: 'var(--entry)', 
                         borderColor: 'var(--icon-info)',
                         color: 'var(--icon-info)'
                     }}>
                    <p>
                        Les réserves publiées de pétrole et de gaz sont incompatibles avec les budgets du GIEC 
                        pour maintenir le réchauffement sous 1.5°C (avec 50% de probabilité) ou 2°C (avec 67% de probabilité).
                    </p>
                </div>
            )}

            <div className="p-6 rounded-lg mb-6" 
                 style={{ backgroundColor: 'var(--entry)', height: '500px' }}>
                <ResponsiveContainer>
                    <LineChart
                        data={carbonData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                        <XAxis
                            dataKey="year"
                            stroke="var(--chart-axis)"
                            label={{
                                value: 'Année',
                                position: 'bottom',
                                offset: 0,
                                style: { fill: 'var(--chart-axis)' }
                            }}
                        />
                        <YAxis
                            domain={[0, 1200]}
                            stroke="var(--chart-axis)"
                            label={{
                                value: 'Gt CO₂',
                                angle: -90,
                                position: 'insideLeft',
                                offset: -20,
                                style: { fill: 'var(--chart-axis)' }
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} />
                        
                        <Line
                            type="monotone"
                            dataKey="reserves"
                            name="Réserves confirmées pétrole et gaz"
                            stroke="var(--chart-line-1)"
                            strokeWidth={2.5}
                            dot={true}
                        />

                        <ReferenceLine
                            y={BUDGET_1_5C}
                            label={{
                                value: "Budget 1.5°C (50%)",
                                position: 'right',
                                style: { fill: 'var(--chart-line-2)' }
                            }}
                            stroke="var(--chart-line-2)"
                            strokeDasharray="3 3"
                        />

                        <ReferenceLine
                            y={BUDGET_2_0C}
                            label={{
                                value: "Budget 2.0°C (67%)",
                                position: 'right',
                                style: { fill: 'var(--chart-line-3)' }
                            }}
                            stroke="var(--chart-line-3)"
                            strokeDasharray="3 3"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="text-right" style={{ color: 'var(--secondary)' }}>
                Source : GIEC 2023, Statistiques de l'industrie pétrolière
            </p>
        </div>
    );
};

export default CarbonBudgetDashboard;