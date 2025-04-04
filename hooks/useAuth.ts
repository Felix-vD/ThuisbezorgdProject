// services/authService.js
import { Alert, AppState } from 'react-native';
import { supabase } from '../lib/supabase';

// Set up auto-refresh when app state changes
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// Function to sign in a user with email and password
export async function signInWithEmail(email: string, password: string) {
  console.log('Login pressedsss');
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    Alert.alert(error.message);
  }
  return error;
}

// Function to sign up a user with email and password
export async function signUpWithEmail(email: string, password: string) {
  const { data: { session }, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    Alert.alert(error.message);
  }
  if (!session) {
    Alert.alert('Please check your inbox for email verification!');
  }
  return error;
}
