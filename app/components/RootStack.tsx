import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../RootStackParamList";
import LoginScreen from "@/app/screens/authentication/LoginScreen";
import SignUpScreen from "@/app/screens/authentication/SignUpScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
);
};

export default RootStack;  // ✅ Make sure it's a default export
