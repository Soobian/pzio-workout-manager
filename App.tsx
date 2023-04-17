import { SafeAreaView, StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import HomeScreen from './src/screens/HomeScreen';

import { RootStackParamList } from './src/types/navigation'
import LoadingScreen from './src/screens/LoadingScreen';
import StartScreen from './src/screens/StartScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [loaded] = useFonts({
        'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
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
                    </Stack.Group>
                    <Stack.Group>
                        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
