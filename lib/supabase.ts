import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://scdvyzjumlzcnkheipwh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZHZ5emp1bWx6Y25raGVpcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTQ1MzEsImV4cCI6MjA1Nzg5MDUzMX0.WAPt5F7uT6WaOebLxpthHNOhP2bnaPcIBxBuIf8dHY8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})