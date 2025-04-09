import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import global from '../styles/global';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import { signInWithEmail } from '../../hooks/useAuth';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    console.log('Login pressed');
    console.log('Email:', email);
    setLoading(true);
    const error = await signInWithEmail(email, password);
    if (error) {
      // signInWithEmail zeigt bereits einen Alert an
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={global.container}>
      <View style={global.logoContainer}>
        <Image 
          source={require('../../assets/images/just_eat_logo.png')} 
          style={global.logo} 
        />
      </View>

      <Text style={global.title}>Login</Text>
      <Text style={global.subtitle}>Please sign in to continue.</Text>

      <TextInput
        style={global.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={global.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={global.loginButton} 
        onPress={handleLogin} 
        disabled={loading}
      >
        <Text style={global.loginButtonText}>LOGIN →</Text>
      </TouchableOpacity>

      <View style={global.signUpContainer}>
        <Text>Not signed up yet? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={global.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
