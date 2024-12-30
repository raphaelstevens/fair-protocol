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
            <div className="bg-entry-light dark:bg-entry-dark p-4 rounded shadow-lg border border-secondary-light dark:border-secondary-dark">
                <p className="font-semibold mb-2 text-primary-light dark:text-primary-dark">{label}</p>
                <p className="text-icon-info-light dark:text-icon-info-dark">
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
        <div className="bg-theme-light dark:bg-theme-dark rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-bold text-primary-light dark:text-primary-dark">Budget Carbone Global</h1>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`px-4 py-2 rounded-md flex items-center ${
                        showInfo
                            ? 'bg-icon-info-light dark:bg-icon-info-dark text-white'
                            : 'bg-entry-light dark:bg-entry-dark text-secondary-light dark:text-secondary-dark'
                    }`}
                >
                    <span className="mr-2">ℹ️</span>
                    Informations
                </button>
            </div>

            {showInfo && (
                <div className="bg-icon-info-light/10 dark:bg-icon-info-dark/10 border-l-4 border-icon-info-light dark:border-icon-info-dark p-4 mb-6">
                    <p className="text-icon-info-light dark:text-icon-info-dark">
                        Les réserves publiées de pétrole et de gaz sont incompatibles avec les budgets du GIEC 
                        pour maintenir le réchauffement sous 1.5°C (avec 50% de probabilité) ou 2°C (avec 67% de probabilité).
                    </p>
                </div>
            )}

            <div className="bg-entry-light dark:bg-entry-dark p-6 rounded-lg mb-6" style={{ height: '500px' }}>
                <ResponsiveContainer>
                    <LineChart
                        data={carbonData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-secondary-light/20 dark:stroke-secondary-dark/20"
                        />
                        <XAxis
                            dataKey="year"
                            tick={{ fill: 'var(--primary-light)', className: "dark:fill-primary-dark" }}
                            label={{
                                value: 'Année',
                                position: 'bottom',
                                offset: 0,
                                style: { fill: 'var(--primary-light)' },
                            }}
                        />
                        <YAxis
                            domain={[0, 1200]}
                            tick={{ fill: 'var(--primary-light)', className: "dark:fill-primary-dark" }}
                            label={{
                                value: 'Gt CO₂',
                                angle: -90,
                                position: 'insideLeft',
                                offset: -20,
                                style: { fill: 'var(--primary-light)' },
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} />
                        
                        {/* Ligne des réserves */}
                        <Line
                            type="monotone"
                            dataKey="reserves"
                            name="Réserves confirmées pétrole et gaz"
                            stroke="var(--icon-challenge-light)"
                            strokeWidth={2.5}
                            dot={true}
                        />

                        {/* Budget 1.5°C */}
                        <ReferenceLine
                            y={BUDGET_1_5C}
                            label={{
                                value: "Budget 1.5°C (50%)",
                                position: 'right',
                                className: "fill-icon-solution-light dark:fill-icon-solution-dark"
                            }}
                            stroke="var(--icon-solution-light)"
                            strokeDasharray="3 3"
                        />

                        {/* Budget 2.0°C */}
                        <ReferenceLine
                            y={BUDGET_2_0C}
                            label={{
                                value: "Budget 2.0°C (67%)",
                                position: 'right',
                                className: "fill-icon-implementation-light dark:fill-icon-implementation-dark"
                            }}
                            stroke="var(--icon-implementation-light)"
                            strokeDasharray="3 3"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="text-right text-secondary-light dark:text-secondary-dark">
                Source : GIEC 2023, Statistiques de l'industrie pétrolière
            </p>
        </div>
    );
};

export default CarbonBudgetDashboard;
