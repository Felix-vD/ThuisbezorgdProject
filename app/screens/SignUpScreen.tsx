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
import { signUpWithEmail } from '../../hooks/useAuth';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);


  
  async function handleSignUp() {
    if (password !== repeatPassword) {
      Alert.alert('Passwörter stimmen nicht überein!');
      return;
    }
    setLoading(true);
    const error = await signUpWithEmail(email, password);
    if (!error) {
      // Bei Erfolg wieder zum Login navigieren
      navigation.navigate('Login');
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

      <Text style={global.title}>Sign Up</Text>
      <Text style={global.subtitle}>Create your account</Text>

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

      <TextInput
        style={global.input}
        placeholder="Repeat Password"
        secureTextEntry
        value={repeatPassword}
        onChangeText={setRepeatPassword}
      />

      <TouchableOpacity style={global.loginButton} onPress={handleSignUp} disabled={loading}>
        <Text style={global.loginButtonText}>SIGN UP →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
