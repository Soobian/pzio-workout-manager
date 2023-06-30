import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'

type Props = {
    style?: ViewStyle;
    signStyle?: TextStyle;
    onPress?: any;
}

const AddButton = (props: Props) => {
    return (
        <TouchableOpacity
        onPress={props.onPress}>
            <View style={[props.style, styles.container]}>
                <Text style={props.signStyle}>+</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})