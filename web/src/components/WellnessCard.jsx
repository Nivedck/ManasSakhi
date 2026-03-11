import React from 'react';
import { motion } from 'framer-motion';
import { Play, FileText, Phone, Compass } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const WellnessCard = ({ item }) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (item.type) {
      case 'audio': return <Play size={20} className="card-icon" />;
      case 'journal': return <FileText size={20} className="card-icon" />;
      case 'contact': return <Phone size={20} className="card-icon" />;
      case 'intervention':
      case 'exercise':
      default: return <Compass size={20} className="card-icon" />;
    }
  };

  const handleAction = () => {
    if (item.route) {
      navigate(item.route);
    } else {
      console.log(`Action triggered for ${item.title}`);
    }
  };

  return (
    <motion.div 
      className="wellness-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <div className="card-header">
        {getIcon()}
        <h3 className="card-title">{item.title}</h3>
      </div>
      <p className="card-text">{item.text}</p>
      
      <div className="card-action">
        {item.type === 'journal' ? (
           <div style={{ display: 'flex', gap: '8px' }}>
              <Button 
                variant="text" 
                onClick={() => navigate('/journal-list')}
                style={{ padding: '8px 12px', fontSize: '14px', width: 'auto' }}
              >
                Read Past
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/journal')}
                style={{ padding: '8px 16px', fontSize: '14px', width: 'auto' }}
              >
                 Write New
              </Button>
           </div>
        ) : (
          <Button 
             variant="secondary" 
             onClick={handleAction}
             style={{ padding: '8px 16px', fontSize: '14px', width: 'auto' }}
          >
             {item.actionText}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessCard;
