
import React from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  variant?: 'default' | 'glass' | 'elevated';
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const CustomCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const baseStyles = "rounded-xl";
    
    const variantStyles = {
      default: "bg-card text-card-foreground border border-border shadow-sm",
      glass: "glass-card",
      elevated: "bg-card text-card-foreground shadow-lg"
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CustomCard.displayName = 'CustomCard';

export default CustomCard;
