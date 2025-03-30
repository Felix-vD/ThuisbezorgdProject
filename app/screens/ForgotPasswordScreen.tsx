import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import global from '../styles/global'

const ForgotPasswordScreen = () => {
    return (
        <SafeAreaView style={global.container}>
            <View style={global.logoContainer}>
                <Image source={require('../../assets/images/just_eat_logo.png')} style={global.logo}></Image>
            </View>

            <Text style={global.title}>Forgot Password</Text>
            <Text style={global.subtitle}>
                Enter your email address below to receive a reset link.
            </Text>

            <TextInput
                style={global.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={global.loginButton}>
                <Text style={global.loginButtonText}>Send Reset Link</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
