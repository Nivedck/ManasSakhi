import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Moon, ArrowLeft, Clock, Smartphone, TrendingUp, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import NavBar from '../components/NavBar';
import Button from '../components/Button';

// Mock sleep history data
const sleepHistory = [
  { day: 'Mon', hours: 6.5, quality: 'Fair' },
  { day: 'Tue', hours: 7.2, quality: 'Good' },
  { day: 'Wed', hours: 5.8, quality: 'Poor' },
  { day: 'Thu', hours: 8.0, quality: 'Excellent' },
  { day: 'Fri', hours: 7.5, quality: 'Good' },
  { day: 'Sat', hours: 9.0, quality: 'Excellent' },
  { day: 'Sun', hours: 6.0, quality: 'Poor' },
];

const Sleep = () => {
  const navigate = useNavigate();

  const getBarColor = (quality) => {
    switch (quality) {
      case 'Excellent': return 'var(--primary-teal)';
      case 'Good': return 'var(--primary-blue)';
      case 'Fair': return 'var(--alert-orange)';
      case 'Poor': return 'var(--alert-coral)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="screen-container" style={{ backgroundColor: 'var(--bg-light)' }}>
      {/* Header */}
      <header className="home-header" style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigate('/home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', color: 'var(--text-primary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="title" style={{ margin: 0, fontSize: '20px' }}>Sleep Tracking</h1>
      </header>

      <NavBar />

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '100px' }}>

        {/* Sleep Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: 'linear-gradient(135deg, rgba(107, 154, 196, 0.1), rgba(77, 181, 181, 0.1))',
            padding: '24px',
            borderRadius: '24px',
            boxShadow: 'var(--shadow)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{ background: 'var(--gradient-primary)', aspectRatio: 1, color: 'white', padding: '16px', borderRadius: '50%', marginBottom: '16px', boxShadow: '0 4px 14px rgba(59, 145, 145, 0.3)' }}>
            <Moon size={32} />
          </div>
          <h2 style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Last Night's Sleep</h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>6</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>hr</span>
            <span style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>30</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>min</span>
          </div>
          <span style={{ display: 'inline-block', backgroundColor: 'rgba(255, 183, 77, 0.2)', color: 'var(--alert-orange)', padding: '6px 12px', borderRadius: '99px', fontSize: '14px', fontWeight: 'bold' }}>
            Needs Improvement
          </span>
        </motion.div>

        {/* Insights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)', border: '1px solid rgba(255, 255, 255, 0.8)' }}
          >
            <Clock color="var(--primary-teal)" size={24} style={{ marginBottom: '12px' }} />
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Usual Timing</h4>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>1:00 AM - 7:30 AM</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)', border: '1px solid rgba(255, 255, 255, 0.8)' }}
          >
            <Smartphone color="var(--alert-coral)" size={24} style={{ marginBottom: '12px' }} />
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Device Usage</h4>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--alert-coral)' }}>High before bed</p>
          </motion.div>
        </div>

        {/* Suggestion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            backgroundColor: 'rgba(77, 181, 181, 0.1)',
            padding: '20px',
            borderRadius: '20px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start'
          }}
        >
          <div style={{ backgroundColor: 'var(--primary-teal)', color: 'white', padding: '8px', borderRadius: '50%' }}>
            <Info size={20} />
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Suggested Target</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
              To improve your cycle, try winding down at <strong>11:00 PM</strong> without devices, aiming for at least 8 hours.
            </p>
          </div>
        </motion.div>

        {/* Sleep History Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            backgroundColor: 'var(--white)',
            padding: '24px 16px 16px 16px',
            borderRadius: '24px',
            boxShadow: 'var(--shadow)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingLeft: '8px' }}>
            <TrendingUp size={20} color="var(--text-secondary)" />
            <h3 style={{ fontSize: '16px', color: 'var(--text-primary)' }}>7-Day History</h3>
          </div>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepHistory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                <YAxis hide={true} domain={[0, 10]} />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value, name, props) => [`${value} hours`, props.payload.quality]}
                />
                <Bar dataKey="hours" radius={[6, 6, 6, 6]} barSize={24}>
                  {sleepHistory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.quality)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div >
  );
};

export default Sleep;
