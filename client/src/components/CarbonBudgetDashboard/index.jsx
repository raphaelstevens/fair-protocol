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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'var(--chart-tooltip-bg)',
          color: 'var(--chart-tooltip-text)',
          border: `1px solid var(--chart-tooltip-border)`,
          padding: '1rem',
          borderRadius: '0.375rem'
        }}>
          <p className="font-semibold mb-1">
            {entry.name}: {entry.value} Gt CO₂
          </p>
          {showCoal && entry.value === 4070 && (
            <div className="mt-2">
              <div style={{ color: 'var(--chart-line-1)' }}>Oil & Gas: 1000 Gt CO₂</div>
              <div style={{ color: 'var(--chart-line-2)' }}>Coal: 3070 Gt CO₂</div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 w-full" style={{ backgroundColor: 'var(--theme)' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
          Carbon Budget vs Fossil Fuel Reserves
        </h2>
        <button
          onClick={() => setShowCoal(!showCoal)}
          style={{
            backgroundColor: 'var(--chart-button-bg)',
            color: 'var(--chart-button-text)'
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg"
        >
          {showCoal ? "⊖ Hide Coal Reserves" : "⊕ Add Coal Reserves"}
        </button>
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--chart-bg)',
        height: '400px'
      }} className="p-6 rounded-lg">
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
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
                style={{ fill: 'var(--chart-axis-label)' }}
              />
            </XAxis>
            <YAxis 
              type="category" 
              dataKey="name" 
              width={180}
              stroke="var(--chart-axis)"
              style={{ fill: 'var(--chart-axis-label)' }}
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
      
      <p className="text-right mt-4" style={{ color: 'var(--secondary)' }}>
        Source: Industry reports and IPCC carbon budget estimates, 2024
      </p>
    </div>
  );
};

export default CarbonBudgetChart;