//This component 

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';
import { Picker } from '@react-native-picker/picker';
import { useProfile } from '../../context/ProfileContext';

interface Restaurant {
  id: number;
  name: string;
}
//Extract user Session as a prop that is of type Session
export default function Account({ session }: { session: Session }) {
  //use state for loading 
  const [loading, setLoading] = useState(true);
  //use states for profile parameters
  const [username, setUsername] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  //list to store restaurants from supabase restaurants table
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  //custom hook to set global profile context
  const { setProfile } = useProfile(); // get setter from global context
  //if user has a session, get profile and fetch restaurants
  //useEffect to run the function when the session changes
  useEffect(() => {
    if (session) {
      getProfile();
      fetchRestaurants();
    }
  }, [session]);
  //function to get profile data
  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, restaurant, is_verified`)
        .eq('id', session.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setRestaurant(data.restaurant);
        setIsVerified(data.is_verified);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  //function to fetch restaurants from supabase
  async function fetchRestaurants() {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('id, name');
      if (error) {
        throw error;
      }
      if (data) {
        setRestaurants(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }
  //function to update profile data
  async function updateProfile({
    username,
    restaurant,
    is_verified,
  }: {
    username: string;
    restaurant: string;
    is_verified: boolean;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      // If the restaurant changes, we want to ensure is_verified is set to false.
      // TODO: Update restaurant only when it is changed not everytime the profile is updated.
      const updates = {
        id: session.user.id,
        username,
        updated_at: new Date(),
        restaurant,
        is_verified: false, // Always reset to false on update.
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      } else {
        setProfile({
          email: session.user.email ?? '',
          username,
          restaurant,
          is_verified: false,
        });
        // Optionally refetch profile data after a successful update.
        getProfile();
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      {/* Show current restaurant (if any) */}
      <View style={styles.verticallySpaced}>
        <Input
          label="Current Restaurant"
          value={restaurant || ''}
          disabled
        />
      </View>
      {/* Restaurant selection */}
      <View style={styles.verticallySpaced}>
        <Picker
          selectedValue={restaurant}
          onValueChange={(itemValue) => setRestaurant(itemValue)}
        >
          <Picker.Item label="Select a restaurant" value="" />
          {restaurants.map((rest) => (
            <Picker.Item key={rest.id} label={rest.name} value={rest.name} />
          ))}
        </Picker>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update Profile'}
          onPress={() =>
            updateProfile({
              username,
              restaurant,
              is_verified: false,
            })
          }
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
