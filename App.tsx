import { SafeAreaView, StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import HomeScreen from './src/screens/auth/HomeScreen';

import { RootStackParamList } from './src/types/navigation'
import LoadingScreen from './src/screens/LoadingScreen';
import StartScreen from './src/screens/unauth/StartScreen';
import RegisterScreen from './src/screens/unauth/RegisterScreen';
import LoginScreen from './src/screens/unauth/LoginScreen';
import AuthStack from './src/stacks/AuthStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [loaded] = useFonts({
        'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
        'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    });
    
    if (!loaded) {
        return <LoadingScreen/>;
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Group>
                        <Stack.Screen options={{headerShown: false}} name="Start" component={StartScreen}/>
                        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen}/>
                        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
                    </Stack.Group>
                    <Stack.Group>
                        <Stack.Screen options={{headerShown: false}} name="Auth" component={AuthStack}/>
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
