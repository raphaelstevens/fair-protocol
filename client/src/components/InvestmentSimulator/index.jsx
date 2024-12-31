import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Données sourcées du document
const technologyData = [
    { 
        name: 'Puits pétrolier',
        capex: 253,
        category: 'Fossile'
    },
    { 
        name: 'Turbine à gaz CC',
        capex: 1000,
        category: 'Fossile'
    },
    { 
        name: 'H₂ reformage gaz',
        capex: 910,
        category: 'Transition'
    },
    { 
        name: 'H₂ reformage + CCS',
        capex: 1360,
        category: 'Transition'
    },
    { 
        name: 'Éolien terrestre',
        capex: 1590,
        category: 'Renouvelable'
    },
    { 
        name: 'Éolien offshore',
        capex: 3040,
        category: 'Renouvelable'
    },
    { 
        name: 'Nucléaire',
        capex: 6600,
        category: 'Bas carbone'
    }
];

// Écart d'investissement (données du document)
const investmentGapData = [
    { year: 2024, current: 1.8, required: 4.5 },
    { year: 2025, current: 2.0, required: 4.5 },
    { year: 2026, current: 2.2, required: 4.5 },
    { year: 2027, current: 2.4, required: 4.5 },
    { year: 2028, current: 2.6, required: 4.5 },
    { year: 2029, current: 2.8, required: 4.5 },
    { year: 2030, current: 3.0, required: 4.5 }
];

const EnergyTransitionDashboard = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showInfo, setShowInfo] = useState(false);

    const filteredData = selectedCategory === 'all' 
        ? technologyData 
        : technologyData.filter(tech => tech.category === selectedCategory);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={{ 
                    backgroundColor: 'var(--chart-tooltip-bg)',
                    border: '1px solid var(--chart-tooltip-border)',
                    padding: '16px',
                    borderRadius: '8px'
                }}>
                    <p style={{ 
                        color: 'var(--chart-tooltip-text)',
                        fontWeight: 'bold',
                        marginBottom: '8px' 
                    }}>
                        {data.name}
                    </p>
                    <p style={{ color: 'var(--chart-tooltip-text)' }}>
                        Coût: {data.capex.toLocaleString()} $/kW
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 max-w-6xl mx-auto" style={{ backgroundColor: 'var(--entry)' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                    Coûts de la Transition Énergétique
                </h2>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    style={{
                        backgroundColor: showInfo ? 'var(--chart-button-bg-select)' : 'var(--chart-button-bg)',
                        color: showInfo ? 'var(--chart-button-text-select)' : 'var(--chart-button-text)'
                    }}
                    className="px-4 py-2 rounded-md flex items-center"
                >
                    <span className="mr-2">ℹ️</span>
                    Informations
                </button>
            </div>

            {showInfo && (
                <div className="mb-6 p-4 rounded-lg" style={{ 
                    backgroundColor: 'var(--chart-annotation-bg)',
                    color: 'var(--chart-annotation-text)',
                    border: '1px solid var(--chart-annotation-line)'
                }}>
                    <p>Ce graphique présente les coûts d'investissement (CAPEX) par kilowatt de capacité 
                    pour différentes technologies énergétiques. Les investissements requis pour la 
                    transition énergétique sont estimés à 4T$ par an, alors que les investissements 
                    actuels ne sont que de 1.8T$.</p>
                </div>
            )}

            <div className="mb-4 flex gap-2">
                {['all', 'Fossile', 'Transition', 'Renouvelable', 'Bas carbone'].map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                            backgroundColor: selectedCategory === category 
                                ? 'var(--chart-button-bg-select)' 
                                : 'var(--chart-button-bg)',
                            color: selectedCategory === category
                                ? 'var(--chart-button-text-select)'
                                : 'var(--chart-button-text)'
                        }}
                        className="px-3 py-1 rounded-md"
                    >
                        {category === 'all' ? 'Toutes les technologies' : category}
                    </button>
                ))}
            </div>

            <div style={{ height: '500px' }}>
                <ResponsiveContainer>
                    <BarChart
                        data={filteredData}
                        margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                        <XAxis 
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            tick={{ fill: 'var(--chart-axis-label)' }}
                        />
                        <YAxis 
                            label={{ 
                                value: 'Coût d\'investissement ($/kW)', 
                                angle: -90, 
                                position: 'insideLeft',
                                fill: 'var(--chart-axis-label)'
                            }}
                            tick={{ fill: 'var(--chart-axis-label)' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar 
                            dataKey="capex" 
                            fill="var(--chart-line-1)"
                            name="Coût d'investissement"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Graphique des investissements */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                    Écart d'investissement 2024-2030
                </h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer>
                        <LineChart
                            data={investmentGapData}
                            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                            <XAxis 
                                dataKey="year"
                                tick={{ fill: 'var(--chart-axis-label)' }}
                            />
                            <YAxis 
                                label={{ 
                                    value: 'Investissements (T$)', 
                                    angle: -90, 
                                    position: 'insideLeft',
                                    fill: 'var(--chart-axis-label)'
                                }}
                                tick={{ fill: 'var(--chart-axis-label)' }}
                                domain={[0, 5]}
                            />
                            <Tooltip 
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const gap = payload[1].value - payload[0].value;
                                        return (
                                            <div style={{ 
                                                backgroundColor: 'var(--chart-tooltip-bg)',
                                                border: '1px solid var(--chart-tooltip-border)',
                                                padding: '16px',
                                                borderRadius: '8px'
                                            }}>
                                                <p style={{ 
                                                    color: 'var(--chart-tooltip-text)',
                                                    fontWeight: 'bold',
                                                    marginBottom: '8px' 
                                                }}>
                                                    {label}
                                                </p>
                                                <p style={{ color: 'var(--chart-line-1)' }}>
                                                    Actuels : {payload[0].value.toFixed(1)} T$
                                                </p>
                                                <p style={{ color: 'var(--chart-line-3)' }}>
                                                    Requis : {payload[1].value.toFixed(1)} T$
                                                </p>
                                                <p style={{ color: 'var(--chart-tooltip-text)', marginTop: '8px' }}>
                                                    Écart : {gap.toFixed(1)} T$
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="current" 
                                name="Investissements actuels"
                                stroke="var(--chart-line-1)"
                                strokeWidth={2}
                                dot={true}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="required" 
                                name="Niveau requis"
                                stroke="var(--chart-line-3)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--secondary)' }}>
                    L'écart actuel de {(4.5 - 1.8).toFixed(1)} T$ doit être comblé pour atteindre l'objectif 2030.
                </p>
            </div>

            <p className="text-right mt-4" style={{ color: 'var(--secondary)' }}>
                Source : Valayer & Wouters (2024), AIE World Energy Outlook
            </p>
        </div>
    );
};

export default EnergyTransitionDashboard;