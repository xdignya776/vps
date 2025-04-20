
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90",
      outline: "border border-input bg-transparent hover:bg-secondary/50 active:bg-secondary/70",
      ghost: "bg-transparent hover:bg-secondary/50 active:bg-secondary/70"
    };
    
    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 h-8",
      md: "text-sm px-4 py-2 h-10",
      lg: "text-base px-5 py-2.5 h-12"
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
