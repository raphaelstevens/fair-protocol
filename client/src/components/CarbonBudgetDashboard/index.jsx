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
            <div style={{
                backgroundColor: 'var(--entry)',
                border: '1px solid var(--border)',
                padding: '16px',
                borderRadius: '6px'
            }}>
                <p style={{ 
                    color: 'var(--primary)',
                    fontWeight: 600, 
                    marginBottom: '8px'
                }}>{label}</p>
                <p style={{ color: 'var(--chart-line-1)' }}>
                    Réserves: {payload[0].value} Gt CO₂
                </p>
            </div>
        );
    }
    return null;
};

const CarbonBudgetDashboard = () => {
    const [showInfo, setShowInfo] = useState(false);

    const containerStyle = {
        backgroundColor: 'var(--theme)',
        color: 'var(--primary)',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '72rem',
        margin: '0 auto',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    };

    const chartContainerStyle = {
        backgroundColor: 'var(--entry)',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px',
        height: '500px'
    };

    const buttonStyle = {
        backgroundColor: showInfo ? 'var(--icon-info)' : 'var(--entry)',
        color: showInfo ? '#FFFFFF' : 'var(--primary)',
        padding: '8px 16px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center'
    };

    const infoBoxStyle = {
        backgroundColor: 'var(--entry)',
        borderLeft: '4px solid var(--icon-info)',
        padding: '16px',
        marginBottom: '24px',
        color: 'var(--icon-info)'
    };

    return (
        <div style={containerStyle}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Budget Carbone Global</h1>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    style={buttonStyle}
                >
                    <span className="mr-2">ℹ️</span>
                    Informations
                </button>
            </div>

            {showInfo && (
                <div style={infoBoxStyle}>
                    <p>
                        Les réserves publiées de pétrole et de gaz sont incompatibles avec les budgets du GIEC 
                        pour maintenir le réchauffement sous 1.5°C (avec 50% de probabilité) ou 2°C (avec 67% de probabilité).
                    </p>
                </div>
            )}

            <div style={chartContainerStyle}>
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
            <p style={{ textAlign: 'right', color: 'var(--secondary)' }}>
                Source : GIEC 2023, Statistiques de l'industrie pétrolière
            </p>
        </div>
    );
};

export default CarbonBudgetDashboard;