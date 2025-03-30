// ProfileContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface Profile {
  email: string;
  username: string;
  website: string;
  avatarUrl: string;
  restaurant: string;
  is_verified: boolean;
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        return;
      }
      if (sessionData.session && sessionData.session.user) {
        const user = sessionData.session.user;
        const { data, error } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url, restaurant, is_verified`)
          .eq('id', user.id)
          .single();
        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfile({
            email: user.email ?? '',
            username: data.username,
            website: data.website,
            avatarUrl: data.avatar_url,
            restaurant: data.restaurant,
            is_verified: data.is_verified,
          });
        }
      }
    }
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
