import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import Orb from '../components/Orb';
import WellnessCard from '../components/WellnessCard';
import FloatingChat from '../components/FloatingChat';
import MoodGraph from '../components/MoodGraph';
import Button from '../components/Button';
import { Watch, CheckCircle, Loader2, X } from 'lucide-react';
import { feedContent, userProfile } from '../data/mockData';

const Home = () => {
  const { currentMood } = useContext(AppContext);
  const items = feedContent[currentMood] || [];
  const navigate = useNavigate();

  // Smartwatch connection state
  const [showWatchModal, setShowWatchModal] = useState(false);
  const [watchConnectionState, setWatchConnectionState] = useState('idle'); // idle | connecting | connected
  const [isWatchConnected, setIsWatchConnected] = useState(false);

  // Check initial connection status on mount
  useEffect(() => {
    const connected = localStorage.getItem('manassakhi_watch_connected') === 'true';
    setIsWatchConnected(connected);
  }, []);

  const handleAvatarClick = () => {
    if (isWatchConnected) {
      navigate('/health');
    } else {
      setShowWatchModal(true);
      setWatchConnectionState('idle');
    }
  };

  const handleConnectWatch = () => {
    setWatchConnectionState('connecting');
    // Simulate connection delay
    setTimeout(() => {
      setWatchConnectionState('connected');
      setIsWatchConnected(true);
      localStorage.setItem('manassakhi_watch_connected', 'true');
      
      // Auto-navigate to health dashboard after short delay
      setTimeout(() => {
        setShowWatchModal(false);
        navigate('/health');
      }, 1500);
    }, 2500);
  };

  return (
    <div className="screen-container">
      {/* Header */}
      <motion.header 
        className="home-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="title">Good Evening,</h1>
          <p className="subtitle">
            {userProfile.name}
          </p>
        </div>
        <button 
          onClick={handleAvatarClick}
          className="avatar-circle" 
          style={{ 
             cursor: 'pointer', 
             border: isWatchConnected ? '2.5px solid var(--primary-teal)' : '2.5px dashed var(--text-secondary)',
             background: 'none',
             position: 'relative'
          }}
        >
          {userProfile.avatar}
          {isWatchConnected && (
            <div style={{ position: 'absolute', bottom: -4, right: -4, backgroundColor: 'var(--bg-light)', borderRadius: '50%', padding: '2px' }}>
              <div style={{ backgroundColor: 'var(--primary-teal)', width: '12px', height: '12px', borderRadius: '50%' }} />
            </div>
          )}
        </button>
      </motion.header>

      {/* Top Navigation */}
      <NavBar />

      {/* Hero Section with Orb */}
      <section className="hero-section flex-col flex-center">
        <h2 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>
          {currentMood === 'calm' ? 'You seem balanced today.' : 'Take a moment to center yourself.'}
        </h2>
        <Orb />
      </section>

      {/* Mood Graph Section */}
      <section style={{ padding: '0 24px' }}>
        <MoodGraph />
      </section>

      {/* Feed Section */}
      <section className="feed-section">
        <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Recommended for you</h3>
        <div className="feed-list" style={{ paddingBottom: '100px' }}>
          {items.map((item, index) => (
            <WellnessCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <FloatingChat />

      {/* Smartwatch Connection Modal */}
      <AnimatePresence>
        {showWatchModal && (
          <div className="chat-overlay" style={{ alignItems: 'center', zIndex: 200 }}>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               style={{ 
                 backgroundColor: 'var(--white)', 
                 padding: '32px 24px', 
                 borderRadius: '24px', 
                 width: '100%', 
                 maxWidth: '360px',
                 boxShadow: 'var(--shadow)',
                 position: 'relative',
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 textAlign: 'center'
               }}
            >
               {watchConnectionState === 'idle' && (
                 <button 
                   onClick={() => setShowWatchModal(false)}
                   style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                 >
                   <X size={24} />
                 </button>
               )}

               <div style={{ 
                 background: watchConnectionState === 'connected' ? 'var(--gradient-primary)' : 'var(--bg-light)', 
                 padding: '24px', borderRadius: '50%', marginBottom: '24px',
                 color: watchConnectionState === 'connected' ? 'var(--white)' : 'var(--primary-blue)',
                 transition: 'all 0.3s'
               }}>
                 {watchConnectionState === 'connected' ? <CheckCircle size={48} /> : <Watch size={48} />}
               </div>

               <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>
                 {watchConnectionState === 'idle' && 'Connect Smartwatch'}
                 {watchConnectionState === 'connecting' && 'Pairing Device...'}
                 {watchConnectionState === 'connected' && 'Connected!'}
               </h2>
               
               <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px', lineHeight: '1.5' }}>
                 {watchConnectionState === 'idle' && 'Link your wearable device to monitor your heart rate, HRV, and blood pressure in real-time.'}
                 {watchConnectionState === 'connecting' && 'Make sure your watch screen is on and Bluetooth is enabled on both devices.'}
                 {watchConnectionState === 'connected' && 'Your vitals are now syncing with ManasSakhi.'}
               </p>

               {watchConnectionState === 'idle' && (
                 <Button onClick={handleConnectWatch} style={{ width: '100%' }}>
                   Pair New Device
                 </Button>
               )}

               {watchConnectionState === 'connecting' && (
                 <div className="flex-center" style={{ color: 'var(--primary-teal)' }}>
                    <motion.div
                       animate={{ rotate: 360 }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                       <Loader2 size={32} />
                    </motion.div>
                 </div>
               )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
