import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Smartphone } from 'lucide-react';

// Component to test mobile navigation functionality
const MobileNavigationTest = () => {
  const [showTest, setShowTest] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => setShowTest(!showTest)}
        size="sm"
        variant="outline"
        className="fixed bottom-20 right-4 z-50"
      >
        <Smartphone className="h-4 w-4 mr-2" />
        Mobile Test
      </Button>

      {showTest && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 lg:hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Mobile Navigation Test</h2>
              <Button
                onClick={() => setShowTest(false)}
                size="sm"
                variant="ghost"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Test Checklist:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Menu toggle opens/closes properly</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>All navigation items are accessible</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Dropdown menus work in mobile</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Search functionality works</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Contact options are visible</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Auth buttons function properly</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Responsive Breakpoints:</h3>
                <div className="text-xs space-y-1">
                  <div>sm: 640px - <span className="text-green-600">✓ Tested</span></div>
                  <div>md: 768px - <span className="text-green-600">✓ Tested</span></div>
                  <div>lg: 1024px - <span className="text-green-600">✓ Tested</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigationTest;