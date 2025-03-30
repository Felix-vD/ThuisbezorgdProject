import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import RootStack from "@/app/components/RootStack";
import CurrentOrdersScreen from "@/app/screens/CurrentOrdersScreen";

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
  return (
      <CurrentOrdersScreen />
  );
}