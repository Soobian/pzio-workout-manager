import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import InputWithLabel from '../../components/InputWithLabel';
import Button from '../../components/Button';
import TopBar from '../../components/TopBar';

import { baseAPI } from '../../api/API';

import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';

const { height, width } = Dimensions.get('window');

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")

    const navigation = useNavigation();

    const initErrors = Object.freeze({
        email: '',
        password: '',
        repeatedPassword: ''
    });

    const [errors, setErrors] = useState(initErrors);

    const updateError = (name: string, value: string) => {
		setErrors({
			...errors,
			[name]: value,
		});
	};

    const validatePassword = () => {
        if(typeof password !== "undefined" && typeof repeatedPassword !== "undefined") {
            if (password != repeatedPassword) {
                updateError(repeatedPassword, "Passwords don't match.");
                return false;
            } else {
                return true;
            }
        }
    }

    const status400 = (data: { [x: string]: string[]; }) => {
        for (var key of Object.keys(data)) {
            console.log(data[key][0]);
        } 
    }


    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const payload = JSON.stringify({email, password});
        console.log(payload);
        if(validatePassword()){
            baseAPI.post('user/create/', payload)
            .then((res) => {
                navigation.navigate('Start');
            })
            .catch((error) => {
                if(error.response.status == 400) {
                    status400(error.response.data);
                }
            })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopBar title='Create Your Account'/>
            <View style={styles.contentContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.formFieldsContainer}>
                        <InputWithLabel text={'Email'} value={email} onChangeValue={setEmail}/>
                        <InputWithLabel text={'Password'} value={password} onChangeValue={setPassword} password={true}/>
                        <InputWithLabel text={'Confirm Password'} value={repeatedPassword} onChangeValue={setRepeatedPassword} password={true}/>
                    </View>
                    <Button 
                    text='Create Your Account' 
                    onPress={handleSubmit.bind(this)}
                    style={styles.registerButton}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen

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