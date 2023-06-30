import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import InputWithLabel from '../../components/InputWithLabel'
import Button from '../../components/Button'
import TopBar from '../../components/TopBar'

import { tokenAPI } from '../../api/API';

import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

const { height, width } = Dimensions.get('window');

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthorized, setAuthorization] = useState(false)

    const navigation = useNavigation();

    const handleLogin = (e: Event) => {
        e.preventDefault();
        const payload = JSON.stringify({email, password});
        console.log(payload);
        
        const onSuccess = ({ data }: any) => {
            console.log(data.access)
            console.log(data.refresh)
            SecureStore.setItemAsync('access_token', data.access)
            SecureStore.setItemAsync('refresh_token', data.refresh)
            setAuthorization(true)
            navigation.navigate("Auth")
        };
        
        const onFailure = (error: any) => {
            console.log(error);
        };

        tokenAPI.post('token/', payload)
            .then(onSuccess)
            .catch(onFailure);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopBar title='Log In' backButton={true}/>
            <View style={styles.contentContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.formFieldsContainer}>
                        <InputWithLabel text={'Email'} value={email} onChangeValue={setEmail}/>
                        <InputWithLabel text={'Password'} value={password} onChangeValue={setPassword} password={true}/>
                    </View>
                    <Button 
                    text='Log In'
                    onPress={handleLogin.bind(this)}
                    //onPress={navigation.navigate('Auth')}
                    style={styles.registerButton}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.backgroundColor
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: normalize(20),
        display: 'flex',
        flexDirection: 'column',
    },
    formContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: normalize(30),
    },
    formFieldsContainer:{
        gap: normalize(30),
    },
    registerButton: {
        width: width * 0.6,
    },
})