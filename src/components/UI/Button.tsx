import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  children,
  className = '',
  type = 'button',
}) => {
  // Base classes
  let classes = 'rounded font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';

  // Variant classes
  switch (variant) {
    case 'primary':
      classes += ' bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50';
      break;
    case 'secondary':
      classes += ' bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:shadow-lg hover:shadow-cyan-500/50';
      break;
    case 'danger':
      classes += ' bg-red-500 hover:bg-red-400 text-white hover:shadow-lg hover:shadow-red-500/50';
      break;
    case 'ghost':
      classes += ' border border-emerald-400 text-emerald-400 hover:bg-emerald-400/10';
      break;
  }

  // Size classes
  switch (size) {
    case 'sm':
      classes += ' px-3 py-1 text-sm';
      break;
    case 'md':
      classes += ' px-4 py-2 text-base';
      break;
    case 'lg':
      classes += ' px-6 py-3 text-lg';
      break;
  }

  // Disabled classes
  if (disabled) {
    classes += ' opacity-50 cursor-not-allowed';
  }

  // Additional className
  classes += ` ${className}`;

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classes.trim()}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;