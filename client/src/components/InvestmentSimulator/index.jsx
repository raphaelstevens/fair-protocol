import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnergyTransitionDashboard = () => {
    const [showInfo, setShowInfo] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Données mock pour les coûts d'investissement
    const data = [
        { name: 'Gaz naturel', capex: 1000, category: 'Fossile' },
        { name: 'Pétrole', capex: 590, category: 'Fossile' },
        { name: 'H2 via gaz', capex: 910, category: 'Transition' },
        { name: 'H2 avec CCS', capex: 1360, category: 'Transition' },
        { name: 'Éolien terrestre', capex: 1590, category: 'Renouvelable' },
        { name: 'Éolien offshore', capex: 3040, category: 'Renouvelable' },
        { name: 'Nucléaire', capex: 6600, category: 'Bas carbone' }
    ];

    const filteredData = selectedCategory === 'all' 
        ? data 
        : data.filter(item => item.category === selectedCategory);

    // Données mock pour l'écart d'investissement
    const investmentGapData = [
        { year: 2024, current: 1.8, required: 4.0 },
        { year: 2025, current: 2.0, required: 4.1 },
        { year: 2026, current: 2.2, required: 4.2 },
        { year: 2027, current: 2.4, required: 4.3 },
        { year: 2028, current: 2.6, required: 4.4 },
        { year: 2029, current: 2.8, required: 4.4 },
        { year: 2030, current: 3.0, required: 4.5 }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-tooltip">
                    <p className="chart-tooltip-label">{label}</p>
                    <p className="chart-tooltip-value">
                        {payload[0].name}: {payload[0].value} $/kW
                    </p>
                </div>
            );
        }
        return null;
    };

    const InvestmentGapTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const gap = payload[1].value - payload[0].value;
            return (
                <div className="chart-tooltip">
                    <p className="chart-tooltip-label">{label}</p>
                    <p className="chart-tooltip-value">Actuels : {payload[0].value.toFixed(1)} T$</p>
                    <p className="chart-tooltip-value">Requis : {payload[1].value.toFixed(1)} T$</p>
                    <p className="chart-tooltip-value">Écart : {gap.toFixed(1)} T$</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <h3>Tableau de bord d'analyse des prix</h3>
                </div>
            </div>

            <div className="dashboard-buttons">
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`dashboard-button ${showInfo ? 'selected' : ''}`}
                >
                    <span>ℹ️</span>
                    Informations
                </button>
            </div>

            {showInfo && (
                <div className="dashboard-info">
                    <p>
                        Ce graphique présente les coûts d'investissement (CAPEX) par kilowatt de capacité 
                        pour différentes technologies énergétiques. Les investissements requis pour la 
                        transition énergétique sont estimés à 4T$ par an, alors que les investissements 
                        actuels ne sont que de 1.8T$.
                    </p>
                </div>
            )}

            <div className="dashboard-buttons">
                {['all', 'Fossile', 'Transition', 'Renouvelable', 'Bas carbone'].map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`dashboard-button ${selectedCategory === category ? 'selected' : ''}`}
                    >
                        {category === 'all' ? 'Toutes les technologies' : category}
                    </button>
                ))}
            </div>

            <div className="dashboard-chart-container h-96">
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
                                position: 'left',
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

            <div className="dashboard-chart-container mt-6">
                <h3 className="dashboard-subtitle">
                    Écart d'investissement 2024-2030
                </h3>
                <div className="h-64">
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
                                    position: 'middle',
                                    fill: 'var(--chart-axis-label)'
                                }}
                                tick={{ fill: 'var(--chart-axis-label)' }}
                                domain={[0, 5]}
                            />
                            <Tooltip content={<InvestmentGapTooltip />} />
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
                <p className="dashboard-info">
                    L'écart actuel de {(4.5 - 1.8).toFixed(1)} T$ doit être comblé pour atteindre l'objectif 2030.
                </p>
            </div>

            <p className="dashboard-source">
                Source : Valayer & Wouters (2024), AIE World Energy Outlook
            </p>
        </div>
    );
};

export default EnergyTransitionDashboard;