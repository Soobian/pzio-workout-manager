import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'

import { COLORS } from '../constants/colors';
import { FONTS } from  '../constants/fonts';

import { normalize } from '../utils/screen-size';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    text: string,
    style: ViewStyle,
    onPress: () => void;
}

const Button = ({ text, style, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <LinearGradient 
            colors={[COLORS.gradientColorOne, COLORS.gradientColorTwo]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={[style, styles.linearContainer]}>
                <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: normalize(50),
        borderRadius: normalize(25),
    },
    linearContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: normalize(10),
        borderRadius: normalize(25),
    },
    text: {
        fontFamily: FONTS.Bold,
        fontSize: normalize(18),
    }
})