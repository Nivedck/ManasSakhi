import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', style, className = '', ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary-teal)',
          color: 'var(--white)',
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: 'var(--primary-teal)',
          border: '2px solid var(--primary-teal)',
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
    padding: '12px 24px',
    borderRadius: 'var(--border-radius)',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    gap: '8px',
    width: '100%',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      style={baseStyles}
      className={`transition-base ${className} btn-bg-white`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
