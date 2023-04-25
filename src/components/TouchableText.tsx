import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'

import { FONTS } from '../constants/fonts'

type Props = {
    text: string,
    style?: ViewStyle,
    onPress: () => void,
}

const TouchableText = ({text, style, onPress}: Props) => {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={[style, styles.container]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default TouchableText

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: FONTS.Bold,
    },
})