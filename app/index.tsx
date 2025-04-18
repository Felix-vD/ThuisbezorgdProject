// index.tsx
import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import Layout from './_layout';

const linking = {
  // This ensures the URL uses the expo linking prefix for development.
  prefixes: ['exp://145.126.0.80:8081/'],
  config: {
    // The config object maps URL paths to navigator screens.
    // Make sure the keys here exactly match the names used in your navigators.
    screens: {
      // These are for the auth navigator (when no session exists)
      Home: '',
      Login: 'login',
      SignUp: 'signup',
      // And you can also map screens for your Tab Navigator (when session exists)
      Orders: 'orders',
      Profile: 'profile'
    }
  }
};

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Layout />
    </NavigationContainer>
  );
}

registerRootComponent(App);
