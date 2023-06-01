import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'

import { FONTS } from '../constants/fonts'

type Props = {
    text: string,
    containerStyle?: ViewStyle,
    textStyle?: TextStyle,
    onPress: () => void,
}

const TouchableText = ({text, containerStyle, textStyle, onPress}: Props) => {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={containerStyle}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

export default TouchableText