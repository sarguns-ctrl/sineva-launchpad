import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  location: string;
  propertyType: string;
  investmentAmount: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    role: 'International Investor',
    company: 'Rodriguez Holdings',
    content: 'Sineva helped me navigate the complex E-2 visa process while finding the perfect commercial property in Houston. Their expertise in international real estate is unmatched.',
    rating: 5,
    avatar: '/api/placeholder/60/60',
    location: 'Mexico City → Houston, TX',
    propertyType: 'Commercial Office',
    investmentAmount: '$2.8M'
  },
  {
    id: '2',
    name: 'James Chen',
    role: 'Tech Entrepreneur',
    company: 'Chen Innovations',
    content: 'The team at Sineva found me an established tech consulting business that perfectly aligned with my L-1 visa requirements. The entire process was seamless.',
    rating: 5,
    avatar: '/api/placeholder/60/60',
    location: 'Shanghai → Austin, TX',
    propertyType: 'Technology Business',
    investmentAmount: '$750K'
  },
  {
    id: '3',
    name: 'Sophie Dubois',
    role: 'Luxury Investor',
    company: 'Dubois Estate',
    content: 'We purchased a stunning River Oaks estate through Sineva. Their attention to detail and deep market knowledge made our American dream a reality.',
    rating: 5,
    avatar: '/api/placeholder/60/60',
    location: 'Paris → Houston, TX',
    propertyType: 'Luxury Residential',
    investmentAmount: '$1.25M'
  },
  {
    id: '4',
    name: 'Ahmed Al-Rashid',
    role: 'Manufacturing Investor',
    company: 'Al-Rashid Industries',
    content: 'Sineva identified an excellent manufacturing business opportunity in San Antonio. Their due diligence and support throughout the EB-5 process was exceptional.',
    rating: 5,
    avatar: '/api/placeholder/60/60',
    location: 'Dubai → San Antonio, TX',
    propertyType: 'Manufacturing Business',
    investmentAmount: '$1.85M'
  },
  {
    id: '5',
    name: 'Isabella Santos',
    role: 'Retail Investor',
    company: 'Santos Ventures',
    content: 'The retail shopping center we acquired through Sineva has exceeded our ROI expectations. Their market analysis and investment guidance was spot-on.',
    rating: 5,
    avatar: '/api/placeholder/60/60',
    location: 'São Paulo → Dallas, TX',
    propertyType: 'Retail Complex',
    investmentAmount: '$3.2M'
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      ref={elementRef}
      className="py-16 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6 border border-accent/20">
            <Quote className="w-4 h-4" />
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-clash text-primary mb-4">
            Trusted by International Investors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of successful investors who've achieved their American dream through our expertise
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
        }`}>
          <Card className="bg-card/80 backdrop-blur-xl border-0 shadow-elegant overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="md:col-span-2 space-y-6">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {currentTestimonial.rating}.0
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="space-y-2">
                    <div className="font-semibold text-lg text-primary">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentTestimonial.role} • {currentTestimonial.company}
                    </div>
                    <div className="text-sm text-accent font-medium">
                      {currentTestimonial.location}
                    </div>
                  </div>
                </div>

                {/* Client Avatar & Stats */}
                <div className="text-center space-y-6">
                  <Avatar className="w-24 h-24 mx-auto ring-4 ring-accent/20">
                    <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {/* Investment Details */}
                  <div className="space-y-3">
                    <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                      <div className="text-sm text-muted-foreground">Investment Amount</div>
                      <div className="font-bold text-lg text-accent">
                        {currentTestimonial.investmentAmount}
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                      <div className="text-sm text-muted-foreground">Property Type</div>
                      <div className="font-medium text-primary">
                        {currentTestimonial.propertyType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation & Indicators */}
        <div className="flex items-center justify-center mt-8 space-x-6">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="rounded-full w-10 h-10 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Dot Indicators */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="rounded-full w-10 h-10 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Ready to join our success stories?</p>
          <Button className="bg-gradient-primary hover:shadow-accent shadow-button" asChild>
            <Link to="/contact">
              Schedule Your Consultation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;