import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import About from './about';
import Location from './tracking';
import Account from './components/Account';
import { ProfileProvider } from '../context/ProfileContext';
import useAutoRefreshSession from '../hooks/useAutoRefreshSession';
import ProfileScreen from './screens/ProfileScreen';
import { Linking } from 'react-native';
type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

export default function Layout() {
  useAutoRefreshSession();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aktuelle Session abrufen
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Auf Auth-Statusänderungen lauschen
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

  return (
    
      session ? (
        <ProfileProvider>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Orders" component={About} />
            <Tab.Screen name="Profile">
              {() => <ProfileScreen session={session} />}
            </Tab.Screen>
          </Tab.Navigator>
        </ProfileProvider>
      ) : (
        <AuthNavigator />
      )
    
  );
}
