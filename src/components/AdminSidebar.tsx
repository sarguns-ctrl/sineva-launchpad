import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, 
  BarChart3, 
  Home, 
  FileText, 
  Users, 
  MessageSquare, 
  Mail, 
  Settings, 
  Briefcase,
  TrendingUp,
  Database
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const adminItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Shield,
    group: "Overview"
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    group: "Overview"
  },
  {
    title: "Properties",
    url: "/admin/properties",
    icon: Home,
    group: "Content"
  },
  {
    title: "Blog Posts",
    url: "/admin/blog",
    icon: FileText,
    group: "Content"
  },
  {
    title: "Businesses",
    url: "/admin/businesses",
    icon: Briefcase,
    group: "Content"
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    group: "Management"
  },
  {
    title: "Leads",
    url: "/admin/leads",
    icon: MessageSquare,
    group: "Management"
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    icon: Mail,
    group: "Marketing"
  },
  {
    title: "Performance",
    url: "/admin/performance",
    icon: TrendingUp,
    group: "Analytics"
  },
  {
    title: "System Settings",
    url: "/admin/settings",
    icon: Settings,
    group: "Configuration"
  },
  {
    title: "Integrations",
    url: "/admin/integrations",
    icon: Database,
    group: "Configuration"
  }
];

// Group items by their group property
const groupedItems = adminItems.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof adminItems>);

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="px-2">
        {Object.entries(groupedItems).map(([groupName, items]) => {
          const hasActiveItem = items.some(item => isActive(item.url));
          
          return (
            <SidebarGroup key={groupName}>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {groupName}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          end 
                          className={({ isActive }) => `
                            flex items-center px-3 py-2 rounded-md text-sm transition-colors
                            ${getNavCls({ isActive })}
                          `}
                        >
                          <item.icon className="h-4 w-4 mr-2 shrink-0" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}