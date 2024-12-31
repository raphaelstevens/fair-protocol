import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

// Définition des technologies avec leurs caractéristiques
const technologies = [
    { 
        id: 'petrol', 
        name: 'Puits pétrolier', 
        baseCapacity: 100, // MW
        cost: 250, // $/kW
        carbonIntensity: 820, // g/kWh
        reliabilityFactor: 0.95,
        constructionTime: 1,
        category: 'fossile'
    },
    { 
        id: 'gas', 
        name: 'Turbine à gaz CC', 
        baseCapacity: 500,
        cost: 1000,
        carbonIntensity: 490,
        reliabilityFactor: 0.90,
        constructionTime: 2,
        category: 'fossile'
    },
    { 
        id: 'wind', 
        name: 'Éolien terrestre', 
        baseCapacity: 100,
        cost: 1590,
        carbonIntensity: 11,
        reliabilityFactor: 0.35,
        constructionTime: 2,
        category: 'renouvelable'
    },
    { 
        id: 'offshore', 
        name: 'Éolien offshore', 
        baseCapacity: 400,
        cost: 3040,
        carbonIntensity: 12,
        reliabilityFactor: 0.45,
        constructionTime: 3,
        category: 'renouvelable'
    },
    { 
        id: 'nuclear', 
        name: 'Nucléaire', 
        baseCapacity: 1000,
        cost: 6600,
        carbonIntensity: 12,
        reliabilityFactor: 0.90,
        constructionTime: 7,
        category: 'bas carbone'
    }
];

const InvestmentSimulator = () => {
    const [budget, setBudget] = useState(4500);
    const [year, setYear] = useState(2024);
    const [investments, setInvestments] = useState({});
    const [simulating, setSimulating] = useState(false);
    const [simulationSpeed, setSimulationSpeed] = useState(1);
    const [simulationData, setSimulationData] = useState([]);
    const [selectedMetric, setSelectedMetric] = useState('emissions');
    const [showTutorial, setShowTutorial] = useState(true);

    const calculateMetrics = (currentInvestments) => {
        let totalCapacity = 0;
        let totalEmissions = 0;
        let reliableCapacity = 0;
        let investmentCost = 0;

        Object.entries(currentInvestments).forEach(([techId, amount]) => {
            const tech = technologies.find(t => t.id === techId);
            if (tech && amount > 0) {
                const units = Math.floor(amount / (tech.cost * tech.baseCapacity));
                const capacity = units * tech.baseCapacity;
                totalCapacity += capacity;
                totalEmissions += capacity * tech.carbonIntensity * 8760 * tech.reliabilityFactor / 1000000;
                reliableCapacity += capacity * tech.reliabilityFactor;
                investmentCost += amount;
            }
        });

        return {
            capacity: totalCapacity,
            emissions: totalEmissions,
            reliability: reliableCapacity / (totalCapacity || 1) * 100,
            cost: investmentCost
        };
    };

    useEffect(() => {
        let interval;
        if (simulating) {
            interval = setInterval(() => {
                setYear(prev => {
                    if (prev >= 2030) {
                        setSimulating(false);
                        return 2030;
                    }
                    const metrics = calculateMetrics(investments);
                    setSimulationData(prev => [...prev, {
                        year: prev,
                        ...metrics
                    }]);
                    return prev + 1;
                });
            }, 1000 / simulationSpeed);
        }
        return () => clearInterval(interval);
    }, [simulating, simulationSpeed, investments]);

    const handleInvestmentChange = (techId, amount) => {
        setInvestments(prev => ({
            ...prev,
            [techId]: Math.max(0, amount)
        }));
    };

    const startSimulation = () => {
        setSimulationData([]);
        setYear(2024);
        setSimulating(true);
    };

    const getMetricColor = (value, metric) => {
        const thresholds = {
            emissions: { good: 1000, bad: 5000 },
            reliability: { good: 90, bad: 70 },
            cost: { good: budget * 0.8, bad: budget * 1.2 }
        };

        const t = thresholds[metric];
        if (!t) return 'var(--chart-line-1)';

        if (metric === 'reliability') {
            if (value >= t.good) return 'var(--chart-line-3)';
            if (value <= t.bad) return 'var(--chart-line-1)';
            return 'var(--chart-line-2)';
        } else {
            if (value <= t.good) return 'var(--chart-line-3)';
            if (value >= t.bad) return 'var(--chart-line-1)';
            return 'var(--chart-line-2)';
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: 'var(--chart-tooltip-bg)',
                    padding: '1rem',
                    border: '1px solid var(--chart-tooltip-border)',
                    borderRadius: '0.5rem'
                }}>
                    <p style={{ color: 'var(--chart-tooltip-text)', fontWeight: 'bold' }}>
                        Année {label}
                    </p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toLocaleString()} 
                            {entry.name === 'Émissions' ? ' Mt CO₂' : 
                             entry.name === 'Fiabilité' ? '%' : 
                             entry.name === 'Capacité' ? ' MW' : ' M$'}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 max-w-6xl mx-auto" style={{ backgroundColor: 'var(--entry)' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                    Simulateur de Transition Énergétique 2030
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowTutorial(true)}
                        style={{
                            backgroundColor: 'var(--chart-button-bg)',
                            color: 'var(--chart-button-text)'
                        }}
                        className="px-4 py-2 rounded-md flex items-center"
                    >
                        <span className="mr-2">❓</span>
                        Aide
                    </button>
                    {simulating ? (
                        <button
                            onClick={() => setSimulating(false)}
                            style={{
                                backgroundColor: 'var(--chart-button-bg-select)',
                                color: 'var(--chart-button-text-select)'
                            }}
                            className="px-4 py-2 rounded-md"
                        >
                            ⏹️ Stop
                        </button>
                    ) : (
                        <button
                            onClick={startSimulation}
                            style={{
                                backgroundColor: 'var(--chart-button-bg)',
                                color: 'var(--chart-button-text)'
                            }}
                            className="px-4 py-2 rounded-md"
                        >
                            ▶️ Simuler
                        </button>
                    )}
                </div>
            </div>

            {showTutorial && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowTutorial(false)}
                >
                    <div 
                        className="p-6 max-w-2xl rounded-lg"
                        style={{ backgroundColor: 'var(--chart-tooltip-bg)' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--primary)' }}>
                            Comment utiliser le simulateur ?
                        </h3>
                        <ol className="space-y-2" style={{ color: 'var(--primary)' }}>
                            <li>1. Définissez vos investissements pour chaque technologie</li>
                            <li>2. Lancez la simulation avec le bouton ▶️</li>
                            <li>3. Observez l'évolution des métriques jusqu'en 2030</li>
                            <li>4. Ajustez la vitesse de simulation si besoin</li>
                            <li>5. Changez de métrique pour voir différents aspects</li>
                        </ol>
                        <div className="mt-6 text-sm" style={{ color: 'var(--secondary)' }}>
                            <p>Objectifs pour 2030 :</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Réduire les émissions sous 1000 Mt CO₂</li>
                                <li>Maintenir une fiabilité supérieure à 90%</li>
                                <li>Rester dans le budget de {budget.toLocaleString()} M$</li>
                            </ul>
                        </div>
                        <button
                            className="mt-6 px-4 py-2 rounded-md w-full"
                            style={{
                                backgroundColor: 'var(--chart-button-bg-select)',
                                color: 'var(--chart-button-text-select)'
                            }}
                            onClick={() => setShowTutorial(false)}
                        >
                            Commencer
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--theme)' }}>
                    <h3 className="font-bold mb-4" style={{ color: 'var(--primary)' }}>
                        Investissements par Technologie
                    </h3>
                    <div className="space-y-4">
                        {technologies.map(tech => (
                            <div key={tech.id} className="flex items-center gap-4">
                                <label 
                                    className="flex-grow"
                                    style={{ color: 'var(--primary)' }}
                                >
                                    {tech.name}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max={budget}
                                    value={investments[tech.id] || 0}
                                    onChange={(e) => handleInvestmentChange(tech.id, parseInt(e.target.value))}
                                    className="flex-grow"
                                    disabled={simulating}
                                />
                                <span 
                                    className="w-24 text-right"
                                    style={{ color: 'var(--secondary)' }}
                                >
                                    {(investments[tech.id] || 0).toLocaleString()} M$
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--theme)' }}>
                    <h3 className="font-bold mb-4" style={{ color: 'var(--primary)' }}>
                        Paramètres de Simulation
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <label style={{ color: 'var(--primary)' }}>
                                Vitesse :
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={simulationSpeed}
                                onChange={(e) => setSimulationSpeed(parseInt(e.target.value))}
                                className="flex-grow"
                            />
                            <span style={{ color: 'var(--secondary)' }}>
                                {simulationSpeed}x
                            </span>
                        </div>
                        <div className="flex gap-2">
                            {['emissions', 'reliability', 'capacity', 'cost'].map(metric => (
                                <button
                                    key={metric}
                                    onClick={() => setSelectedMetric(metric)}
                                    style={{
                                        backgroundColor: selectedMetric === metric 
                                            ? 'var(--chart-button-bg-select)' 
                                            : 'var(--chart-button-bg)',
                                        color: selectedMetric === metric
                                            ? 'var(--chart-button-text-select)'
                                            : 'var(--chart-button-text)'
                                    }}
                                    className="px-3 py-1 rounded-md flex-grow"
                                >
                                    {metric === 'emissions' ? 'Émissions' :
                                     metric === 'reliability' ? 'Fiabilité' :
                                     metric === 'capacity' ? 'Capacité' : 'Coût'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: '400px' }}>
                <ResponsiveContainer>
                    <LineChart
                        data={simulationData}
                        margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                        <XAxis 
                            dataKey="year"
                            tick={{ fill: 'var(--chart-axis-label)' }}
                        />
                        <YAxis 
                            tick={{ fill: 'var(--chart-axis-label)' }}
                            label={{ 
                                value: selectedMetric === 'emissions' ? 'Mt CO₂' :
                                       selectedMetric === 'reliability' ? 'Fiabilité (%)' :
                                       selectedMetric === 'capacity' ? 'Capacité (MW)' :
                                       'Coût (M$)',
                                angle: -90,
                                position: 'insideLeft',
                                fill: 'var(--chart-axis-label)'
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        
                        <Line
                            type="monotone"
                            dataKey={selectedMetric}
                            name={selectedMetric === 'emissions' ? 'Émissions' :
                                 selectedMetric === 'reliability' ? 'Fiabilité' :
                                 selectedMetric === 'capacity' ? 'Capacité' :
                                 'Coût'}
                            stroke={getMetricColor(
                                simulationData[simulationData.length - 1]?.[selectedMetric] || 0,
                                selectedMetric
                            )}
                            strokeWidth={2}
                            dot={false}
                        />

                        {selectedMetric === 'emissions' && (
                            <ReferenceLine 
                                y={1000} 
                                stroke="var(--chart-line-3)" 
                                strokeDasharray="3 3"
                                label={{ 
                                    value: "Objectif 2030",
                                    fill: 'var(--chart-line-3)',
                                    position: 'right'
                                }}
                            />
                        )}
                        {selectedMetric === 'reliability' && (
                            <ReferenceLine 
                                y={90} 
                                stroke="var(--chart-line-3)" 
                                strokeDasharray="3 3"
                                label={{ 
                                    value: "Minimum requis",
                                    fill: 'var(--chart-line-3)',
                                    position: 'right'
                                }}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">
                {['emissions', 'reliability', 'capacity', 'cost'].map(metric => {
                    const currentValue = simulationData[simulationData.length - 1]?.[metric] || 0;
                    return (
                        <div 
                            key={metric}
                            className="p-4 rounded-lg"
                            style={{ 
                                backgroundColor: 'var(--theme)',
                                borderLeft: `4px solid ${getMetricColor(currentValue, metric)}`
                            }}
                        >
                            <h4 
                                className="text-sm mb-2"
                                style={{ color: 'var(--secondary)' }}
                            >
                                {metric === 'emissions' ? 'Émissions' :
                                 metric === 'reliability' ? 'Fiabilité' :
                                 metric === 'capacity' ? 'Capacité' : 'Coût'}
                            </h4>
                            <p 
                                className="text-2xl font-bold"
                                style={{ color: 'var(--primary)' }}
                            >
                                {currentValue.toLocaleString()}
                                <span className="text-sm ml-1" style={{ color: 'var(--secondary)' }}>
                                    {metric === 'emissions' ? 'Mt CO₂' :
                                     metric === 'reliability' ? '%' :
                                     metric === 'capacity' ? 'MW' : 'M'}
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>

            {year === 2030 && !simulating && (
                <div 
                    className="mt-6 p-4 rounded-lg"
                    style={{ 
                        backgroundColor: 'var(--chart-annotation-bg)',
                        color: 'var(--chart-annotation-text)',
                        border: '1px solid var(--chart-annotation-line)'
                    }}
                >
                    <h3 className="font-bold mb-2">Résultats de la simulation</h3>
                    <p>
                        Votre stratégie d'investissement a conduit à :
                        {simulationData[simulationData.length - 1]?.emissions <= 1000 ?
                            " ✅ Objectif d'émissions atteint !" :
                            " ❌ Émissions trop élevées"}
                        {simulationData[simulationData.length - 1]?.reliability >= 90 ?
                            " ✅ Système fiable" :
                            " ❌ Fiabilité insuffisante"}
                        {simulationData[simulationData.length - 1]?.cost <= budget ?
                            " ✅ Budget respecté" :
                            " ❌ Dépassement de budget"}
                    </p>
                    <button
                        onClick={() => {
                            setYear(2024);
                            setSimulationData([]);
                            setInvestments({});
                        }}
                        className="mt-4 px-4 py-2 rounded-md"
                        style={{
                            backgroundColor: 'var(--chart-button-bg)',
                            color: 'var(--chart-button-text)'
                        }}
                    >
                        Recommencer
                    </button>
                </div>
            )}

            <p className="text-right mt-4" style={{ color: 'var(--secondary)' }}>
                Données : AIE World Energy Outlook 2023
            </p>
        </div>
    );
};

export default InvestmentSimulator;