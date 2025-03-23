import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Import screens
import About from "./about";
import Location from "./tracking";
import Login from "./screens/authentication/login";

const Tab = createBottomTabNavigator();

export default function App() {
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

  return (
    // <Tab.Navigator>
    //
    //   <Tab.Screen name="About" component={About} />
    //   <Tab.Screen name="Location" component={Location} />
    // </Tab.Navigator>
      <Login />
  );
}
