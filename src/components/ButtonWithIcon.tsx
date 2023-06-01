import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, ImageStyle } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../constants/colors';
import Icon from './Icon';

type Props = {
    path: string,
    style?: ViewStyle,
    iconStyle?: ImageStyle,
    onPress?: any;
}

const ButtonWithIcon = ({path, style, onPress, iconStyle}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <LinearGradient 
            colors={[COLORS.gradientColorOne, COLORS.gradientColorTwo]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={[style, styles.gradientContainer]}>
                <Icon path={path} style={iconStyle}/>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default ButtonWithIcon

const styles = StyleSheet.create({
    container: {

    },
    gradientContainer: {

    }
})