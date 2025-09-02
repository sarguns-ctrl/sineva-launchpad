import { ReactNode, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'default' | 'gradient' | 'glass' | 'accent';
}

const FloatingCard = ({ 
  children, 
  className = '', 
  delay = 0,
  variant = 'default'
}: FloatingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-primary text-primary-foreground';
      case 'glass':
        return 'bg-card/70 backdrop-blur-xl border border-border/30';
      case 'accent':
        return 'bg-gradient-accent text-accent-foreground';
      default:
        return 'bg-card/90 backdrop-blur-sm border border-border/50';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Card
        className={`
          ${getVariantClasses()}
          ${className}
          hover:scale-105 hover:shadow-elegant
          transition-all duration-500 cursor-pointer group
          transform hover:-translate-y-2
          ${isHovered ? 'shadow-glow' : 'shadow-card'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-8">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingCard;