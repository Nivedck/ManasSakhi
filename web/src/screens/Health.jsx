import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HeartPulse, Activity, Thermometer, BatteryFull, Watch, Unplug } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import NavBar from '../components/NavBar';
import Button from '../components/Button';

const Health = () => {
  const navigate = useNavigate();
  const [hrData, setHrData] = useState([]);
  const [currentHR, setCurrentHR] = useState(72);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate real-time heart rate data
  useEffect(() => {
    const connected = localStorage.getItem('manassakhi_watch_connected') === 'true';
    setIsConnected(connected);

    if (!connected) return;

    // Initial data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: `-${20 - i}s`,
      bpm: 70 + Math.floor(Math.random() * 15)
    }));
    setHrData(initialData);

    const interval = setInterval(() => {
      const newBpm = 70 + Math.floor(Math.random() * 15);
      setCurrentHR(newBpm);
      
      setHrData(prev => {
        const newData = [...prev.slice(1), { time: 'Now', bpm: newBpm }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem('manassakhi_watch_connected');
    navigate('/home');
  };

  return (
    <div className="screen-container" style={{ backgroundColor: 'var(--bg-light)' }}>
      {/* Header */}
      <header className="home-header" style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
             <button 
               onClick={() => navigate('/home')} 
               style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
             >
               <ArrowLeft size={24} />
             </button>
             <h1 className="title" style={{ margin: 0, fontSize: '20px' }}>Vitals</h1>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-teal)', fontSize: '12px', fontWeight: 'bold' }}>
            {isConnected && (
              <>
                <Watch size={16} />
                <BatteryFull size={16} />
                <span>98%</span>
              </>
            )}
         </div>
      </header>
      
      <NavBar />

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '100px' }}>
        
        {!isConnected ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '50%', marginBottom: '24px', color: 'var(--text-secondary)', boxShadow: 'var(--shadow)' }}>
               <Watch size={48} />
            </div>
            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>No Watch Connected</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px', lineHeight: '1.5', maxWidth: '280px' }}>
              Connect your smartwatch from the Home screen to view your real-time health vitals.
            </p>
            <Button onClick={() => navigate('/home')} style={{ width: '100%' }}>
              Go to Home Screen
            </Button>
          </div>
        ) : (
          <>
            {/* Heart Rate Display */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px' }}
            >
               <motion.div
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 60 / currentHR, repeat: Infinity }}
                 style={{ color: 'var(--alert-coral)', marginBottom: '8px' }}
               >
                 <HeartPulse size={48} />
               </motion.div>
               <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>{currentHR}</span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>BPM</span>
               </div>
               <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Resting Heart Rate</p>
            </motion.div>

            {/* Real-time Graph */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ 
                 backgroundColor: 'var(--white)', 
                 padding: '24px 16px 16px 16px', 
                 borderRadius: '24px', 
                 boxShadow: 'var(--shadow)',
                 border: '1px solid rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ width: '100%', height: '140px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hrData} margin={{ top: 5, right: 0, left: -24, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBPM" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--alert-coral)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--alert-coral)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <YAxis hide={true} domain={['dataMin - 10', 'dataMax + 10']} />
                    <Area 
                      type="monotone" 
                      dataKey="bpm" 
                      stroke="var(--alert-coral)" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBPM)" 
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Other Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '20px', boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.02)' }}
               >
                  <Activity color="var(--primary-blue)" size={24} style={{ marginBottom: '12px' }} />
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Blood Pressure</h4>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>118<span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/75</span></p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '20px', boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.02)' }}
               >
                  <Thermometer color="var(--alert-orange)" size={24} style={{ marginBottom: '12px' }} />
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skin Temp</h4>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>36.5<span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>°C</span></p>
               </motion.div>
            </div>

            {/* Disconnect Button */}
            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
               <Button 
                 variant="outline" 
                 onClick={handleDisconnect}
                 style={{ width: '100%', borderColor: 'var(--alert-coral)', color: 'var(--alert-coral)' }}
               >
                 <Unplug size={18} />
                 Disconnect Watch
               </Button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Health;
