import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, PenLine } from 'lucide-react';
import Button from '../components/Button';
import { mockJournalEntries } from '../data/mockData';

const JournalList = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('manassakhi_journals');
    if (saved) {
      setEntries(JSON.parse(saved));
    } else {
      setEntries(mockJournalEntries);
      localStorage.setItem('manassakhi_journals', JSON.stringify(mockJournalEntries));
    }
  }, []);

  return (
    <div className="screen-container" style={{ backgroundColor: 'var(--bg-light)' }}>
      {/* Header */}
      <header className="home-header" style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '16px' }}>
        <button 
          onClick={() => navigate('/home')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="title" style={{ margin: 0, fontSize: '20px' }}>Past Entries</h1>
      </header>

      {/* Main Content */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Your recent reflections
          </p>
          <Button 
            onClick={() => navigate('/journal')}
            style={{ width: 'auto', padding: '8px 16px', fontSize: '14px' }}
          >
            <PenLine size={16} />
            Write
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  backgroundColor: 'var(--white)', 
                  padding: '16px', 
                  borderRadius: '16px', 
                  boxShadow: 'var(--shadow)', 
                  border: '1px solid rgba(0,0,0,0.02)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--primary-teal)' }}>
                  <BookOpen size={16} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{entry.date}</span>
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {entry.text}
                </p>
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
              No entries yet. Start writing!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalList;
