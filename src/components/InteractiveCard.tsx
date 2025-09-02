import { ReactNode, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: boolean;
  glowOnHover?: boolean;
}

const InteractiveCard = ({ 
  children, 
  className = '', 
  delay = 0,
  hoverScale = true,
  glowOnHover = false 
}: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

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
          ${className}
          ${hoverScale ? 'hover:scale-105' : ''}
          ${glowOnHover && isHovered ? 'shadow-elegant' : ''}
          transition-all duration-500 cursor-pointer group
          hover:shadow-card
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveCard;