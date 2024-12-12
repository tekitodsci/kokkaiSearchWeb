import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { SearchResult } from '../types';

interface ResultChartProps {
  data: { [key: string]: SearchResult[] };
}

// より目に優しい配色
export const COLORS = ['#4f46e5', '#059669', '#b45309'];

export const ResultChart: React.FC<ResultChartProps> = ({ data }) => {
  const allYears = Object.values(data).flat().map(d => d.year);
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  
  // Combine all data into a single array for the chart
  const chartData = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => ({
      year: minYear + i,
      ...Object.entries(data).reduce((acc, [keyword, results]) => {
        const yearData = results.find(r => r.year === minYear + i);
        acc[keyword] = yearData ? yearData.count : 0;
        return acc;
      }, {} as { [key: string]: number })
    })
  );

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={chartData} 
          margin={{ top: 30, right: 30, left: 50, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis 
            label={{ 
              value: '出現回数', 
              angle: -90, 
              position: 'left',
              offset: 10
            }}
          />
          <Tooltip />
          <Legend 
            verticalAlign="top" 
            height={36}
          />
          {Object.keys(data).map((keyword, index) => (
            keyword !== '' && (
              <Line
                key={keyword}
                type="monotone"
                dataKey={keyword}
                name={keyword}
                stroke={COLORS[index]}
                strokeWidth={2}
                dot={{ fill: COLORS[index] }}
              />
            )
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};