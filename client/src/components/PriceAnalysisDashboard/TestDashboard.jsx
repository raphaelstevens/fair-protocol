import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';

// Simple data for testing
const testData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 }
];

const TestDashboard = () => {
  console.log('TestDashboard mounting');
  console.log('Environment check:', {
    windowKeys: Object.keys(window),
    hasResizeObserver: 'ResizeObserver' in window,
    hasRequestAnimationFrame: 'requestAnimationFrame' in window,
    process: typeof process,
    processEnv: typeof process?.env,
  });

  return (
    <div style={{ width: '100%', height: '400px', padding: '20px' }}>
      <h1>Test Chart</h1>
      <div style={{ width: '100%', height: '300px' }}>
        {console.log('Before ResponsiveContainer')}
        <ResponsiveContainer>
          {console.log('Inside ResponsiveContainer')}
          <LineChart data={testData}>
            {console.log('Inside LineChart')}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TestDashboard;