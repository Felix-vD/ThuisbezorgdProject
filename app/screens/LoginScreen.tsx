import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../components/RootStackParamList"
import global from '../styles/global'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';
import { signInWithEmail } from '../hooks/useAuth';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    async function handleLogin() {
        setLoading(true);
        // Call the imported signInWithEmail function
        await signInWithEmail(email, password);
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

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={global.forgotPassword}>Forgot password</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={global.loginButton} 
                onPress={handleLogin} 
                disabled={loading}
            >
                <Text style={global.loginButtonText}>LOGIN →</Text>
            </TouchableOpacity>

            <View style={global.signUpContainer}>
                <Text>Don't have an account yet? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={global.signUpLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;