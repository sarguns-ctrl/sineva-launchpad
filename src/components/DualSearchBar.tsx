import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Users } from 'lucide-react';

const DualSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'properties' | 'agents'>('properties');
  const navigate = useNavigate();

  const suggestedSearches = {
    properties: [
      'Miami Luxury Condos',
      'Toronto Business Properties', 
      'Austin Tech Hubs',
      'Mexico City Offices',
      'Los Angeles Warehouses'
    ],
    agents: [
      'E-2 Visa Specialists',
      'Business Immigration Experts',
      'Luxury Property Agents',
      'Commercial Brokers',
      'International Specialists'
    ]
  };

  const handleSearch = () => {
    if (searchType === 'properties') {
      navigate('/properties');
    } else {
      navigate('/agents');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-elegant p-6 border border-border">
        {/* Search Type Toggle */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-muted rounded-lg p-1 flex">
            <button
              onClick={() => setSearchType('properties')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                searchType === 'properties'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>Find Properties</span>
            </button>
            <button
              onClick={() => setSearchType('agents')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                searchType === 'agents'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Find Agents</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={
                searchType === 'properties'
                  ? 'Location, Property Type, or Business Category'
                  : 'Agent Name, Specialty, or Location'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-muted focus:border-primary"
            />
          </div>
          <Button 
            onClick={handleSearch}
            size="lg" 
            className="px-8 h-12 shadow-button hover:scale-105 transition-all duration-300"
          >
            Search
          </Button>
        </div>

        {/* Suggested Searches */}
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-2">Suggested Searches:</div>
          <div className="flex flex-wrap gap-2">
            {suggestedSearches[searchType].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(suggestion)}
                className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualSearchBar;