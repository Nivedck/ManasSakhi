import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { Lock, Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const { currentMood, toggleMood } = useContext(AppContext);
  const [preferences, setPreferences] = useState({
    keystroke: true,
    voice: false,
    notifications: true
  });

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="screen-container">
      <header className="home-header" style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
        <h1 className="title">Settings</h1>
      </header>

      <NavBar />

      <div className="settings-content" style={{ padding: '24px' }}>
        
        {/* Privacy Badge */}
        <div style={{ backgroundColor: 'var(--bg-light)', padding: '16px', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(77, 181, 181, 0.3)', marginBottom: '32px' }}>
          <Lock color="var(--primary-teal)" size={24} />
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Privacy First</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>All data stays on device</p>
          </div>
        </div>

        {/* Mock Toggles */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-secondary)' }}>Preferences</h3>
          
          <div className="setting-item">
            <span>Keystroke Sensing</span>
            <div 
              className={`toggle ${preferences.keystroke ? 'active' : ''}`}
              onClick={() => togglePreference('keystroke')}
              style={{ cursor: 'pointer' }}
            >
               <div className="toggle-thumb" style={preferences.keystroke ? { right: '2px', left: 'auto' } : { left: '2px', right: 'auto' }} />
            </div>
          </div>
          
          <div className="setting-item">
            <span>Voice Analysis</span>
            <div 
              className={`toggle ${preferences.voice ? 'active' : ''}`}
              onClick={() => togglePreference('voice')}
              style={{ cursor: 'pointer' }}
            >
               <div className="toggle-thumb" style={preferences.voice ? { right: '2px', left: 'auto' } : { left: '2px', right: 'auto' }} />
            </div>
          </div>
          
          <div className="setting-item">
            <span>Notifications</span>
            <div 
              className={`toggle ${preferences.notifications ? 'active' : ''}`}
              onClick={() => togglePreference('notifications')}
              style={{ cursor: 'pointer' }}
            >
               <div className="toggle-thumb" style={preferences.notifications ? { right: '2px', left: 'auto' } : { left: '2px', right: 'auto' }} />
            </div>
          </div>
        </div>

        {/* Demo Mode */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <SettingsIcon size={20} color="var(--primary-blue)" />
            <h3 style={{ fontSize: '16px' }}>Demo Controls</h3>
          </div>
          
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
            Use this toggle to simulate a change in affective state (detected stress vs calm baseline).
          </p>

          <Button 
            variant="secondary" 
            onClick={toggleMood}
            style={{ 
               backgroundColor: currentMood === 'stressed' ? 'rgba(255, 183, 77, 0.1)' : 'transparent',
               borderColor: currentMood === 'stressed' ? 'var(--alert-orange)' : 'var(--primary-teal)',
               color: currentMood === 'stressed' ? 'var(--alert-orange)' : 'var(--primary-teal)',
            }}
          >
            {currentMood === 'calm' ? 'Simulate Stress State' : 'Return to Calm State'}
          </Button>

          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
            Current State: <strong>{currentMood.toUpperCase()}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
