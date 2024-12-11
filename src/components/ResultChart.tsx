import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SearchResult } from '../types';

interface ResultChartProps {
  data: SearchResult[];
  keyword: string;
}

export const ResultChart: React.FC<ResultChartProps> = ({ data, keyword }) => {
  if (data.length === 0) return null;

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-lg font-semibold mb-4">「{keyword}」の出現回数推移</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            label={{ value: '年', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            label={{ 
              value: '出現回数', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={{ fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};