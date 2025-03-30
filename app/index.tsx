import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../app/screens/authentication/LoginScreen'
import SignUpScreen from "@/app/screens/authentication/SignUpScreen";
import {RootStackParamList} from "@/app/RootStackParamList";

const startDataSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
}

export default function App(): React.JSX.Element {
  startDataSession()

  const Stack = createStackNavigator<RootStackParamList>();
  return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
  );
}