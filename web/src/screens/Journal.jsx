import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../components/Button';
import { mockJournalEntries } from '../data/mockData';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    if (entry.trim()) {
      const saved = localStorage.getItem('manassakhi_journals');
      const existingEntries = saved ? JSON.parse(saved) : mockJournalEntries;
      
      const newEntry = {
        id: 'j' + Date.now(),
        date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
        text: entry.trim()
      };
      
      const updatedEntries = [newEntry, ...existingEntries];
      localStorage.setItem('manassakhi_journals', JSON.stringify(updatedEntries));

      setIsSaved(true);
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  };

  return (
    <div className="screen-container" style={{ backgroundColor: 'var(--bg-light)' }}>
      {/* Header */}
      <header className="home-header" style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '16px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="title" style={{ margin: 0, fontSize: '20px' }}>Daily Journal</h1>
      </header>

      {/* Main Content */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '14px' }}>
          Take a moment to write down your thoughts. How are you feeling right now?
        </p>
        
        <textarea 
          placeholder="I'm feeling..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          style={{ 
            flex: 1, 
            width: '100%', 
            padding: '20px', 
            borderRadius: 'var(--border-radius)', 
            border: '1px solid rgba(77, 181, 181, 0.2)', 
            outline: 'none', 
            resize: 'none', 
            fontFamily: 'inherit', 
            fontSize: '16px', 
            lineHeight: '1.6',
            color: 'var(--text-primary)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)',
            marginBottom: '24px',
            backgroundColor: 'var(--white)'
          }}
        />

        <AnimatePresence mode="wait">
          {isSaved ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-center"
              style={{ color: 'var(--primary-teal)', fontWeight: '600', padding: '12px' }}
            >
              Entry saved securely ✨
            </motion.div>
          ) : (
            <Button onClick={handleSave} style={{ alignSelf: 'center' }}>
              <Save size={18} />
              Save Entry
            </Button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Journal;
