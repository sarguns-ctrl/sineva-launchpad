import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type UserRole = 'admin' | 'hr' | 'agent' | 'user';

interface RoleData {
  role: UserRole;
  assigned_by: string | null;
  assigned_at: string;
}

export const useRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setUserRole(null);
      setRoleData(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: roleError } = await supabase
        .from('user_roles')
        .select('role, assigned_by, assigned_at')
        .eq('user_id', user.id)
        .order('assigned_at', { ascending: false })
        .limit(1)
        .single();

      if (roleError) {
        // If no role found, assign default 'user' role
        if (roleError.code === 'PGRST116') {
          await assignRole('user');
          return;
        }
        throw roleError;
      }

      setUserRole(data.role as UserRole);
      setRoleData(data as RoleData);
    } catch (err: any) {
      console.error('Error fetching user role:', err);
      setError(err.message);
      // Fallback to 'user' role
      setUserRole('user');
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async (role: UserRole, assignedBy?: string) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: user.id,
          role: role as any,
          assigned_by: assignedBy || user.id,
          assigned_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,role'
        });

      if (error) {
        if (error.code === '42501' || error.message.includes('policy')) {
          return { 
            success: false, 
            error: 'Permission denied. Only admins and HR can assign roles.' 
          };
        }
        throw error;
      }

      setUserRole(role);
      setRoleData({
        role,
        assigned_by: assignedBy || user.id,
        assigned_at: new Date().toISOString()
      });

      return { success: true };
    } catch (err: any) {
      console.error('Error assigning role:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const hasRole = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!userRole) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    }
    
    return userRole === requiredRole;
  };

  const hasPermission = (permission: string): boolean => {
    if (!userRole) return false;

    // Role hierarchy and permissions
    const rolePermissions: Record<UserRole, string[]> = {
      admin: ['*'], // Admin has all permissions
      hr: [
        'user.manage',
        'employee.manage', 
        'training.manage',
        'reports.view',
        'notifications.send',
        'team.manage', // Merged from manager role
        'employee.view',
        'properties.manage', // Can manage property approvals
        'business.manage' // Can manage business approvals
      ],
      agent: [
        'properties.manage',
        'leads.manage',
        'commissions.view',
        'clients.manage'
      ],
      user: [
        'profile.view',
        'profile.edit',
        'properties.view',
        'favorites.manage'
      ]
    };

    const permissions = rolePermissions[userRole] || [];
    return permissions.includes('*') || permissions.includes(permission);
  };

  const isAdmin = (): boolean => hasRole('admin');
  const isAgent = (): boolean => hasRole(['admin', 'agent']);
  const canManageUsers = (): boolean => hasRole(['admin', 'hr']);

  return {
    userRole,
    roleData,
    loading,
    error,
    hasRole,
    hasPermission,
    isAdmin,
    isAgent,
    canManageUsers,
    assignRole,
    refetch: fetchUserRole
  };
};