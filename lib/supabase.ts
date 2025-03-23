import { createClient } from '@supabase/supabase-js'
import { Platform } from 'react-native';
const supabaseUrl = "https://scdvyzjumlzcnkheipwh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZHZ5emp1bWx6Y25raGVpcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTQ1MzEsImV4cCI6MjA1Nzg5MDUzMX0.WAPt5F7uT6WaOebLxpthHNOhP2bnaPcIBxBuIf8dHY8"

// We'll set up our storage based on runtime environment.
// IMPORTANT: We never import AsyncStorage at the top level.
let storage: any;

if (Platform.OS === 'web') {
  // On web, use localStorage only if window exists (i.e. not during SSR)
  if (typeof window !== 'undefined' && window.localStorage) {
    storage = window.localStorage;
  } else {
    // If window is undefined (SSR), provide a simple in-memory fallback.
    storage = {
      getItem: (key: string) => null,
      setItem: (key: string, value: string) => {},
      removeItem: (key: string) => {},
    };
  }
} else if (Platform.OS === 'ios' || Platform.OS === 'android') {
  // On native, dynamically require AsyncStorage so it isn’t loaded on web.
  try {
    storage = require('@react-native-async-storage/async-storage').default;
  } catch (error) {
    console.warn('AsyncStorage not available, falling back to in-memory storage.');
    storage = {
      getItem: (key: string) => null,
      setItem: (key: string, value: string) => {},
      removeItem: (key: string) => {},
    };
  }
} else {
  // Fallback for any other environments.
  storage = {
    getItem: (key: string) => null,
    setItem: (key: string, value: string) => {},
    removeItem: (key: string) => {},
  };
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Use the storage object determined above.
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});