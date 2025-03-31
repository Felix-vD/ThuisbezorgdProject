import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../components/RootStackParamList";
import LoginScreen from "@/app/screens/LoginScreen";
import SignUpScreen from "@/app/screens/SignUpScreen";
import ForgotPasswordScreen from "@/app/screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
);
};

export default RootStack;