import React from 'react';

interface BadgeProps {
  variant?: 'tier' | 'status' | 'score';
  color?: 'green' | 'cyan' | 'red' | 'yellow' | 'gray';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'status',
  color = 'gray',
  children,
  className = '',
}) => {
  let classes = 'px-2 py-1 rounded text-xs font-mono font-bold uppercase border';

  // Variant-specific styles
  switch (variant) {
    case 'tier':
      classes += ' bg-slate-800 border-emerald-400 text-emerald-400';
      break;
    case 'status':
      classes += ' text-sm';
      break;
    case 'score':
      classes += ' shadow-lg';
      break;
  }

  // Color styles (skip for tier variant)
  if (variant !== 'tier') {
    switch (color) {
      case 'green':
        classes += ' bg-emerald-500/20 text-emerald-400 border-emerald-400';
        break;
      case 'cyan':
        classes += ' bg-cyan-500/20 text-cyan-400 border-cyan-400';
        break;
      case 'red':
        classes += ' bg-red-500/20 text-red-400 border-red-400';
        break;
      case 'yellow':
        classes += ' bg-yellow-500/20 text-yellow-400 border-yellow-400';
        break;
      case 'gray':
        classes += ' bg-slate-500/20 text-slate-400 border-slate-400';
        break;
    }
  }

  // Additional className
  classes += ` ${className}`;

  return <span className={classes.trim()}>{children}</span>;
};

export default Badge;