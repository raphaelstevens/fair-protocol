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

// Budget carbone constants
const BUDGET_1_5C = 500; // 50% probabilité < 1.5°C
const BUDGET_2_0C = 800; // 67% probabilité < 2.0°C

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
                <p className="font-semibold mb-2">{label}</p>
                <p style={{ color: '#1f77b4' }}>
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
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Budget Carbone Global</h1>
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

            {showInfo && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-700">
                        Les réserves publiées de pétrole et de gaz sont incompatibles avec les budgets du GIEC 
                        pour maintenir le réchauffement sous 1.5°C (avec 50% de probabilité) ou 2°C (avec 67% de probabilité).
                    </p>
                </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg mb-6" style={{ height: '500px' }}>
                <ResponsiveContainer>
                    <LineChart
                        data={carbonData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="year"
                            style={{ fill: '#1B365D' }}
                            label={{
                                value: 'Année',
                                position: 'bottom',
                                offset: 0,
                                style: { fill: '#1B365D' }
                            }}
                        />
                        <YAxis 
                            domain={[0, 1200]}
                            style={{ fill: '#1B365D' }}
                            label={{
                                value: 'Gt CO₂',
                                angle: -90,
                                position: 'insideLeft',
                                offset: -20,
                                style: { fill: '#1B365D' }
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} />
                        
                        {/* Ligne des réserves */}
                        <Line
                            type="monotone"
                            dataKey="reserves"
                            name="Réserves confirmées pétrole et gaz"
                            stroke="#1f77b4"
                            strokeWidth={2.5}
                            dot={true}
                        />

                        {/* Lignes de référence pour les budgets */}
                        <ReferenceLine 
                            y={BUDGET_1_5C} 
                            label={{ 
                                value: "Budget 1.5°C (50%)", 
                                position: 'right',
                                fill: '#ff7f0e'
                            }} 
                            stroke="#ff7f0e" 
                            strokeDasharray="3 3" 
                        />
                        <ReferenceLine 
                            y={BUDGET_2_0C} 
                            label={{ 
                                value: "Budget 2.0°C (67%)", 
                                position: 'right',
                                fill: '#2ca02c'
                            }} 
                            stroke="#2ca02c" 
                            strokeDasharray="3 3" 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="text-right text-gray-600">
                Source : GIEC 2023, Statistiques de l'industrie pétrolière
            </p>
        </div>
    );
};

export default CarbonBudgetDashboard;