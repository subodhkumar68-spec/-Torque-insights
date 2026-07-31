import React from 'react';
import { ResponsiveContainer, RadarChart as ReRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface RadarChartProps {
  data: Array<{ subject: string; score: number }>;
  themeColor?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  themeColor = '#C62828'
}) => {
  return (
    <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 border border-slate-200/50 rounded-3xl p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <ReRadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#94A3B8', fontSize: 8 }} 
          />
          <Radar
            name="Candidate Fit"
            dataKey="score"
            stroke={themeColor}
            fill={themeColor}
            fillOpacity={0.15}
          />
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
