import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const CarbonBudgetChart = () => {
  const [showCoal, setShowCoal] = useState(false);

  const data = showCoal ? [
    {
      name: 'Total Fossil Fuel Reserves',
      value: 4070,
      oilAndGas: 1000,
      coal: 3070,
    },
    {
      name: 'Safe Climate Budget',
      value: 500,
    }
  ] : [
    {
      name: 'Current Oil & Gas Reserves',
      value: 1000,
    },
    {
      name: 'Safe Climate Budget',
      value: 500,
    }
  ];

  const containerStyle = {
    backgroundColor: 'var(--theme)',
    color: 'var(--primary)',
    padding: '1.5rem',
    borderRadius: '0.5rem'
  };

  const titleStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: 'var(--primary)',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--entry)',
    color: 'var(--primary)',
    border: 'none',
    cursor: 'pointer'
  };

  const tooltipStyle = {
    backgroundColor: 'var(--entry)',
    color: 'var(--primary)',
    padding: '1rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--chart-grid)'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div style={tooltipStyle}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {entry.name}: {entry.value} Gt CO₂
          </p>
          {showCoal && entry.value === 4070 && (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ color: 'var(--chart-line-1)' }}>Oil & Gas: 1000 Gt CO₂</div>
              <div style={{ color: 'var(--chart-line-2)' }}>Coal: 3070 Gt CO₂</div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const chartContainerStyle = {
    backgroundColor: 'var(--entry)',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    height: '400px'
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={titleStyle}>Carbon Budget vs Fossil Fuel Reserves</h2>
        <button
          onClick={() => setShowCoal(!showCoal)}
          style={buttonStyle}
        >
          {showCoal ? "⊖ Hide Coal Reserves" : "⊕ Add Coal Reserves"}
        </button>
      </div>

      <div style={chartContainerStyle}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--chart-grid)" 
            />
            <XAxis 
              type="number"
              domain={showCoal ? [0, 4500] : [0, 1200]}
              ticks={showCoal ? [0, 500, 1000, 2000, 3000, 4000] : [0, 500, 1000]}
              stroke="var(--chart-axis)"
            >
              <Label 
                value="Gigatons of CO₂ Emissions (Gt CO₂)" 
                position="bottom" 
                offset={20}
                style={{ fill: 'var(--chart-axis)' }}
              />
            </XAxis>
            <YAxis 
              type="category" 
              dataKey="name" 
              width={180}
              stroke="var(--chart-axis)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value"
              fill={(entry) => {
                if (showCoal && entry.value === 4070) {
                  return 'var(--chart-line-2)';
                }
                return entry.name === 'Safe Climate Budget' 
                  ? 'var(--icon-solution)' 
                  : 'var(--chart-line-1)';
              }}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', marginTop: '1rem', textAlign: 'right' }}>
        Source: Industry reports and IPCC carbon budget estimates, 2024
      </p>
    </div>
  );
};

export default CarbonBudgetChart;