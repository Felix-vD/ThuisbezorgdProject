import React from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
    return (
        <SafeAreaView style={global.container}>

            <View style={global.logoContainer}>
                <Image source={require('../../assets/images/just_eat_logo.png')} style={global.logo}></Image>
            </View>

            <Text style={global.title}>Login</Text>
            <Text style={global.subtitle}>Please sign in to continue.</Text>

            <TextInput
                style={global.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={global.input}
                placeholder="Password"
                secureTextEntry
            />

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={global.forgotPassword}>Forgot password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={global.loginButton}>
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