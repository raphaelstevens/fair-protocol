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
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">
            {entry.name}: {entry.value} Gt CO₂
          </p>
          {showCoal && entry.value === 4070 && (
            <div className="mt-2">
              <div className="chart-tooltip-value">Oil & Gas: 1000 Gt CO₂</div>
              <div className="chart-tooltip-value">Coal: 3070 Gt CO₂</div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <h3>Carbon Budget</h3>
                </div>
            </div>
            <div className="dashboard-buttons">
        <button
          onClick={() => setShowCoal(!showCoal)}
          className={`dashboard-button ${showCoal ? 'selected' : ''}`}
        >
          {showCoal ? "⊖ Hide Coal Reserves" : "⊕ Add Coal Reserves"}
        </button>
      </div>

  
      
      <div className="dashboard-chart-container h-96 p-6">
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
                  ? 'var(--chart-line-1)' 
                  : 'var(--chart-line-2)';
              }}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="dashboard-source">
        Source: Industry reports and IPCC carbon budget estimates, 2024
      </p>
    </div>
  );
};

export default CarbonBudgetChart;