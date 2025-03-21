import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import Auth from './components/Auth';
import Account from './components/Account';
import About from './about';
import Location from './tracking';
import { ProfileProvider } from '../context/ProfileContext';
const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for an existing session and listen for auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If no session, show the Auth (login) screen
  if (!session) {
    return <Auth />;
  }

  // If a session exists, show the main app via a Tab Navigator
  return (
    <ProfileProvider>
      <Tab.Navigator>
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Location" component={Location} />
        <Tab.Screen name="Account">
          {() => <Account session={session} />}
        </Tab.Screen>
      </Tab.Navigator>
    </ProfileProvider>
  );
}
