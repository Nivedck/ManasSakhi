import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { time: '6 AM', mood: 3, label: 'Calm' },
  { time: '9 AM', mood: 2, label: 'Slightly Tense' },
  { time: '12 PM', mood: 4, label: 'Focused' },
  { time: '3 PM', mood: 1, label: 'Stressed' },
  { time: '6 PM', mood: 3, label: 'Calm' },
  { time: '9 PM', mood: 5, label: 'Peaceful' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'var(--white)', padding: '8px 12px', borderRadius: '8px', boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.05)' }}>
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '12px', color: 'var(--text-primary)' }}>{label}</p>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--primary-teal)' }}>{payload[0].payload.label}</p>
      </div>
    );
  }
  return null;
};

const MoodGraph = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="wellness-card" 
      style={{ marginBottom: '24px', padding: '24px 16px 16px 16px' }}
    >
      <h3 style={{ fontSize: '16px', marginBottom: '8px', paddingLeft: '8px' }}>Today's Journey</h3>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '8px' }}>
        Your detected emotional state over time.
      </p>
      
      <div style={{ width: '100%', height: '160px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-teal)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--primary-teal)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
              dy={10}
            />
            <YAxis 
              hide={true} 
              domain={[0, 6]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(77, 181, 181, 0.2)', strokeWidth: 2, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="mood" 
              stroke="var(--primary-teal)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMood)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MoodGraph;
