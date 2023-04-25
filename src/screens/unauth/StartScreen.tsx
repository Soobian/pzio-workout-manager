import { TouchableOpacity, StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../../constants/colors';
import { FONTS } from  '../../constants/fonts';

import { normalize } from '../../utils/screen-size';
import Button from '../../components/Button';
import TouchableText from '../../components/TouchableText';

const { height, width } = Dimensions.get('window');

const StartScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>
                    Welcome
                </Text>
                <Button 
                text='Create Your Account' 
                onPress={() => navigation.navigate("Register")}
                style={styles.registerButton}/>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                        Already have an account?
                    </Text>
                    <TouchableText
                    text='Sign In Here'
                    onPress={() => navigation.navigate("Login")}
                    style={styles.loginButton}/>
                </View>
            </View>
        </View>
    )
}

export default StartScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    contentContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: normalize(20),
        width: width,
        paddingHorizontal: normalize(20),
        paddingVertical: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.backgroundColor,
    },
    headerText: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(30),
        fontWeight: 'bold',
    },
    registerButton: {
        width: width * 0.8,
    },
    loginContainer: {
        
    },
    loginText: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(16),
    },
    loginButton: {
        padding: normalize(10),
    },
    descriptionText: {
        fontSize: normalize(20),
        fontFamily: FONTS.Regular,
    },
})