import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', style, className = '', ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--gradient-primary)',
          color: 'var(--white)',
          border: 'none',
          boxShadow: '0 4px 14px rgba(59, 145, 145, 0.3)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--white)',
          color: 'var(--primary-teal)',
          border: '2px solid rgba(59, 145, 145, 0.2)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: 'none',
          padding: '8px',
        };
      default:
        return {};
    }
  };

  const baseStyles = {
    padding: '14px 24px',
    borderRadius: 'var(--border-radius)',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      style={baseStyles}
      className={`transition-base ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
