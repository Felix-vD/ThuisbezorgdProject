import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen = ({ navigation }: Props): React.JSX.Element => {
    return (
        <View>
            <Text>Welcome to the Sign Up Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ fontSize: 18, color: 'blue' }}>Go to Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;