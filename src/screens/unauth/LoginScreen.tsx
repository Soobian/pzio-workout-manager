import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import InputWithLabel from '../../components/InputWithLabel'
import Button from '../../components/Button'
import TopBar from '../../components/TopBar'

import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';

const { height, width } = Dimensions.get('window');

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <SafeAreaView style={styles.container}>
            <TopBar title='Log In'/>
            <View style={styles.contentContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.formFieldsContainer}>
                        <InputWithLabel text={'Email'} value={email} onChangeValue={setEmail}/>
                        <InputWithLabel text={'Password'} value={password} onChangeValue={setPassword} password={true}/>
                    </View>
                    <Button 
                    text='Log In' 
                    onPress={()=>{}}
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
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: normalize(30),
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