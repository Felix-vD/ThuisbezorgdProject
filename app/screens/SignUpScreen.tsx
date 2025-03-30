import {Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/RootStackParamList';
import React, { useState } from 'react';
import global from '../styles/global'

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen() {
    return (
        <SafeAreaView style={global.container}>
            <View style={global.container}>

                <View style={global.logoContainer}>
                    <Image source={require('../../assets/images/just_eat_logo.png')} style={global.logo}></Image>
                </View>

                <Text style={global.title}>Sign Up</Text>
                <Text style={global.subtitle}>Create your account</Text>

                <TextInput
                    style={global.input}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={global.input}
                    placeholder="Password"
                    secureTextEntry
                />
                <TextInput
                    style={global.input}
                    placeholder="Repeat Password"
                    secureTextEntry
                />

                <TouchableOpacity style={global.loginButton}>
                    <Text style={global.loginButtonText}>SIGN UP &rarr;</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}



