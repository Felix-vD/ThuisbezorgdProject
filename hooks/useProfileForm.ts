import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Restaurant {
  id: number;
  name: string;
}

export interface ProfileData {
  username: string;
  avatarUrl: string;
  restaurant: string;
  isVerified: boolean;
}

export default function useProfileForm(session: Session | null) {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  // New state: hold the initial restaurant for later comparison.
  const [initialRestaurant, setInitialRestaurant] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (session) {
      getProfile();
      fetchRestaurants();
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user in the session.');
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url, restaurant, is_verified`)
        .eq('id', session.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setRestaurant(data.restaurant);
        setIsVerified(data.is_verified);
        // Store the initial restaurant for later comparison.
        setInitialRestaurant(data.restaurant);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRestaurants() {
    try {
      const { data, error } = await supabase.from('restaurants').select('id, name');
      if (error) throw error;
      if (data) setRestaurants(data);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user in the session.');
      // Only reset verified status if the restaurant has actually changed.
      const newVerifiedStatus = restaurant !== initialRestaurant ? false : isVerified;

      const updates = {
        id: session.user.id,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date(),
        restaurant,
        is_verified: newVerifiedStatus,
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      // Optionally, refetch to get the updated data.
      await getProfile();
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    username,
    setUsername,
    avatarUrl,
    setAvatarUrl,
    restaurant,
    setRestaurant,
    isVerified,
    restaurants,
    updateProfile,
  };
}
