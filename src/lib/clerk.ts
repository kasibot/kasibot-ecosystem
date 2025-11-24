import { useUser } from '@clerk/clerk-react';
import { UserMetadata } from '@/types';

export const useUserMetadata = () => {
  const { user } = useUser();
  
  if (!user) {
    return null;
  }

  const metadata = user.publicMetadata as UserMetadata;
  return {
    clientId: metadata.clientId,
    role: metadata.role || 'client',
    userId: user.id,
  };
};

export const isAdmin = (role?: string): boolean => {
  return role === 'admin';
};

