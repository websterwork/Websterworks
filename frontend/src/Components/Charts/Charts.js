'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];

export default function Charts({ data, filter = 'all', type = 'line' }) {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    if (filter !== 'all') {
      const filtered = data.map(item => ({
        month: item.month,
        [filter]: item[filter]
      }));
      setChartData(filtered);
    } else {
      setChartData(data);
    }
  }, [data, filter]);

  const pieData = [
    { name: 'Web Dev', value: 35 },
    { name: 'Mobile', value: 25 },
    { name: 'AI', value: 20 },
    { name: 'Security', value: 20 },
  ];

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height="100%" minHeight={256}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={256}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
        <XAxis 
          dataKey="month" 
          stroke="#6B7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6B7280"
          fontSize={12}
        />
        <Tooltip />
        <Legend />
        {filter === 'all' || filter === 'web' ? (
          <Line type="monotone" dataKey="web" stroke="#8B5CF6" strokeWidth={2} />
        ) : null}
        {filter === 'all' || filter === 'mobile' ? (
          <Line type="monotone" dataKey="mobile" stroke="#3B82F6" strokeWidth={2} />
        ) : null}
        {filter === 'all' || filter === 'ai' ? (
          <Line type="monotone" dataKey="ai" stroke="#10B981" strokeWidth={2} />
        ) : null}
        {filter === 'all' || filter === 'security' ? (
          <Line type="monotone" dataKey="cyber" stroke="#F59E0B" strokeWidth={2} />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  );
}