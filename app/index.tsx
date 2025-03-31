import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Import screens
import About from "./about";
import Location from "./tracking";
import RootStack from "@/app/components/RootStack";
import CurrentOrdersScreen from "@/app/screens/CurrentOrdersScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  

  return (
    <View>I hope this works</View>
  );
}

export default function App(): React.JSX.Element {
  startDataSession()
  return (
      <CurrentOrdersScreen />
  );
}