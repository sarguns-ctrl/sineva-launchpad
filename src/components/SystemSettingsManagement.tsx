import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Mail, 
  Upload, 
  Bell, 
  Shield, 
  Globe,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SystemSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  setting_type: 'string' | 'number' | 'boolean' | 'json' | 'array';
  description?: string;
  is_public: boolean;
}

interface SettingsByCategory {
  [category: string]: SystemSetting[];
}

// Mock categories since they don't exist in DB
const getCategoryFromKey = (key: string): string => {
  if (key.includes('email') || key.includes('mail')) return 'email';
  if (key.includes('notification')) return 'notifications';
  if (key.includes('upload') || key.includes('file')) return 'uploads';
  if (key.includes('brand') || key.includes('site')) return 'branding';
  if (key.includes('contact') || key.includes('support')) return 'contact';
  if (key.includes('approval') || key.includes('moderation')) return 'moderation';
  return 'general';
};

export const SystemSettingsManagement: React.FC = () => {
  const [settings, setSettings] = useState<SettingsByCategory>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Use knowledge_base table as system settings don't exist
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('*')
        .order('category', { ascending: true })
        .order('title', { ascending: true });

      if (error) throw error;

      // Transform knowledge_base to settings format and group by category
      const transformedSettings = (data || []).map(kb => ({
        id: kb.id,
        setting_key: kb.title.toLowerCase().replace(/\s+/g, '_'),
        setting_value: kb.content,
        setting_type: 'string' as const,
        description: `Knowledge base: ${kb.title}`,
        is_public: kb.is_published || false
      }));

      const groupedSettings = transformedSettings.reduce((acc: SettingsByCategory, setting) => {
        const category = getCategoryFromKey(setting.setting_key);
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(setting);
        return acc;
      }, {});

      setSettings(groupedSettings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch system settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (settingId: string, value: any) => {
    setSaving(settingId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('knowledge_base')
        .update({ 
          content: value.toString(),
          updated_by: user.id 
        })
        .eq('id', settingId);

      if (error) throw error;

      // Update local state
      setSettings(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(category => {
          updated[category] = updated[category].map(setting => 
            setting.id === settingId 
              ? { ...setting, setting_value: value }
              : setting
          );
        });
        return updated;
      });

      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const renderSettingInput = (setting: SystemSetting) => {
    const isLoading = saving === setting.id;
    
    switch (setting.setting_type) {
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={setting.setting_key}
              checked={setting.setting_value === true || setting.setting_value === 'true'}
              onCheckedChange={(checked) => updateSetting(setting.id, checked)}
              disabled={isLoading}
            />
            <Label htmlFor={setting.setting_key} className="text-sm">
              {setting.setting_value === true || setting.setting_value === 'true' ? 'Enabled' : 'Disabled'}
            </Label>
          </div>
        );
        
      case 'number':
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={setting.setting_value?.toString() || ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value !== '') {
                  updateSetting(setting.id, Number(value));
                }
              }}
              disabled={isLoading}
              className="max-w-xs"
            />
            {isLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
          </div>
        );
        
      case 'string':
        return (
          <div className="flex items-center space-x-2">
            <Input
              value={setting.setting_value?.toString().replace(/"/g, '') || ''}
              onChange={(e) => updateSetting(setting.id, `"${e.target.value}"`)}
              disabled={isLoading}
              className="max-w-md"
            />
            {isLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
          </div>
        );
        
      case 'json':
      case 'array':
        return (
          <div className="space-y-2">
            <Textarea
              value={JSON.stringify(setting.setting_value, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  updateSetting(setting.id, parsed);
                } catch {
                  // Invalid JSON, don't update yet
                }
              }}
              disabled={isLoading}
              className="max-w-lg font-mono text-sm"
              rows={4}
            />
            {isLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
          </div>
        );
        
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Unsupported setting type: {setting.setting_type}
          </div>
        );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'branding':
      case 'contact':
        return <Globe className="h-5 w-5" />;
      case 'uploads':
        return <Upload className="h-5 w-5" />;
      case 'notifications':
        return <Bell className="h-5 w-5" />;
      case 'moderation':
        return <Shield className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="h-4 bg-muted rounded"></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure platform settings and preferences</p>
        </div>
        <Button onClick={fetchSettings} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue={Object.keys(settings)[0]} className="space-y-6">
        <TabsList className="grid w-full grid-cols-auto">
          {Object.keys(settings).map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {getCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(settings).map(([category, categorySettings]) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize">
                  {getCategoryIcon(category)}
                  {category} Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {categorySettings.map((setting) => (
                    <div key={setting.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Label className="text-sm font-medium">
                              {setting.setting_key.replace(/_/g, ' ').toUpperCase()}
                            </Label>
                            {setting.is_public && (
                              <Badge variant="outline" className="text-xs">
                                Public
                              </Badge>
                            )}
                          </div>
                          
                          {setting.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {setting.description}
                            </p>
                          )}
                          
                          {renderSettingInput(setting)}
                        </div>
                      </div>
                    </div>
                  ))}

                  {categorySettings.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No settings found in this category
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {Object.keys(settings).length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Settings Found</h3>
            <p className="text-muted-foreground">
              No system settings have been configured yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};