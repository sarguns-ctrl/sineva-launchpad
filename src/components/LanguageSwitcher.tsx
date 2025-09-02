import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'PT', name: 'Português', flag: '🇧🇷' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'ZH', name: '中文', flag: '🇨🇳' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    // Here you would implement actual language switching logic
    // For now, we'll just update the display
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{currentLanguage}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            {currentLanguage === language.code && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;