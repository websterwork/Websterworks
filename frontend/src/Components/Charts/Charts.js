'use client';

import { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar 
} from 'recharts';

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Charts({ data, filter = 'all', type = 'line' }) {
  const [chartData, setChartData] = useState(data);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Responsive font sizes
  const fontSize = isMobile ? 10 : isTablet ? 11 : 12;
  const legendFontSize = isMobile ? 10 : 11;
  
  // Responsive dimensions
  const chartHeight = isMobile ? 250 : isTablet ? 300 : 350;
  const outerRadius = isMobile ? 60 : isTablet ? 70 : 80;

  if (type === 'pie') {
    return (
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => 
                `${isMobile ? name.charAt(0) : name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                fontSize: `${fontSize}px`,
                borderRadius: '8px',
                border: '1px solid #374151',
                backgroundColor: '#1F2937'
              }}
            />
            {!isMobile && (
              <Legend 
                wrapperStyle={{ fontSize: `${legendFontSize}px` }}
                layout={isTablet ? 'horizontal' : 'vertical'}
                verticalAlign={isTablet ? 'bottom' : 'middle'}
                align={isTablet ? 'center' : 'right'}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === 'bar') {
    return (
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={fontSize}
              tickLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={fontSize}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                fontSize: `${fontSize}px`,
                borderRadius: '8px',
                border: '1px solid #374151',
                backgroundColor: '#1F2937'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: `${legendFontSize}px` }}
              layout={isMobile ? 'horizontal' : 'vertical'}
              verticalAlign={isMobile ? 'bottom' : 'middle'}
              align={isMobile ? 'center' : 'right'}
            />
            {filter === 'all' || filter === 'web' ? (
              <Bar dataKey="web" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            ) : null}
            {filter === 'all' || filter === 'mobile' ? (
              <Bar dataKey="mobile" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            ) : null}
            {filter === 'all' || filter === 'ai' ? (
              <Bar dataKey="ai" fill="#10B981" radius={[4, 4, 0, 0]} />
            ) : null}
            {filter === 'all' || filter === 'security' ? (
              <Bar dataKey="cyber" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            ) : null}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Default line chart
  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
          <XAxis 
            dataKey="month" 
            stroke="#6B7280"
            fontSize={fontSize}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={fontSize}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              fontSize: `${fontSize}px`,
              borderRadius: '8px',
              border: '1px solid #374151',
              backgroundColor: '#1F2937'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: `${legendFontSize}px` }}
            layout={isMobile ? 'horizontal' : 'vertical'}
            verticalAlign={isMobile ? 'bottom' : 'middle'}
            align={isMobile ? 'center' : 'right'}
          />
          {filter === 'all' || filter === 'web' ? (
            <Line 
              type="monotone" 
              dataKey="web" 
              stroke="#8B5CF6" 
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ r: isMobile ? 2 : 3 }}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
          ) : null}
          {filter === 'all' || filter === 'mobile' ? (
            <Line 
              type="monotone" 
              dataKey="mobile" 
              stroke="#3B82F6" 
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ r: isMobile ? 2 : 3 }}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
          ) : null}
          {filter === 'all' || filter === 'ai' ? (
            <Line 
              type="monotone" 
              dataKey="ai" 
              stroke="#10B981" 
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ r: isMobile ? 2 : 3 }}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
          ) : null}
          {filter === 'all' || filter === 'security' ? (
            <Line 
              type="monotone" 
              dataKey="cyber" 
              stroke="#F59E0B" 
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ r: isMobile ? 2 : 3 }}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}