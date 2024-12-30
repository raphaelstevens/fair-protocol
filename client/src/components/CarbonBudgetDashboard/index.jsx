import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { PlusCircle, MinusCircle } from 'lucide-react';

const CarbonBudgetChart = () => {
  const [showCoal, setShowCoal] = useState(false);

  const data = showCoal ? [
    {
      name: 'Total Fossil Fuel Reserves',
      value: 4070,
      oilAndGas: 1000,
      coal: 3070,
      fill: '#4A90E2'  // Couleur primaire du thème pour oil & gas
    },
    {
      name: 'Safe Climate Budget',
      value: 500,
      fill: '#5BAE6E'  // Couleur solution du thème
    }
  ] : [
    {
      name: 'Current Oil & Gas Reserves',
      value: 1000,
      fill: '#4A90E2'  // Couleur primaire du thème
    },
    {
      name: 'Safe Climate Budget',
      value: 500,
      fill: '#5BAE6E'  // Couleur solution du thème
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 p-4 rounded">
          <p className="font-semibold mb-1">
            {entry.name}: {entry.value} Gt CO₂
          </p>
          {showCoal && entry.value === 4070 && (
            <div className="mt-2">
              <div style={{ color: '#4A90E2' }}>Oil & Gas: 1000 Gt CO₂</div>
              <div style={{ color: '#9967C4' }}>Coal: 3070 Gt CO₂</div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Carbon Budget vs Fossil Fuel Reserves</h2>
        <button
          onClick={() => setShowCoal(!showCoal)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          {showCoal ? (
            <>
              <MinusCircle className="w-5 h-5" />
              <span>Hide Coal Reserves</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              <span>Add Coal Reserves</span>
            </>
          )}
        </button>
      </div>

      <div style={{ height: '400px' }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              type="number"
              domain={showCoal ? [0, 4500] : [0, 1200]}
              ticks={showCoal ? [0, 500, 1000, 2000, 3000, 4000] : [0, 500, 1000]}
              stroke="#718096"
            >
              <Label 
                value="Gigatons of CO₂ Emissions (Gt CO₂)" 
                position="bottom" 
                offset={20}
                style={{ fill: '#718096' }}
              />
            </XAxis>
            <YAxis 
              type="category" 
              dataKey="name" 
              width={180}
              stroke="#718096"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value"
              fill={(entry) => {
                if (showCoal && entry.value === 4070) {
                  return '#9967C4';  // Violet pour le total avec charbon
                }
                return entry.fill;
              }}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-sm text-gray-600 mt-4 text-right">
        Source: Industry reports and IPCC carbon budget estimates, 2024
      </p>
    </div>
  );
};

export default CarbonBudgetChart;