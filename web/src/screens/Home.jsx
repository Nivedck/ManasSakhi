import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import Orb from '../components/Orb';
import WellnessCard from '../components/WellnessCard';
import FloatingChat from '../components/FloatingChat';
import MoodGraph from '../components/MoodGraph';
import { feedContent, userProfile } from '../data/mockData';

const Home = () => {
  const { currentMood } = useContext(AppContext);
  const items = feedContent[currentMood] || [];

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
          <p className="subtitle" style={{ color: 'var(--primary-teal)', fontWeight: '700' }}>
            {userProfile.name}
          </p>
        </div>
        <div className="avatar-circle">
          {userProfile.avatar}
        </div>
      </motion.header>

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

      {/* Bottom Navigation */}
      <NavBar />
    </div>
  );
};

export default Home;
