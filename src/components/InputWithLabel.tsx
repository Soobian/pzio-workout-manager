import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '../constants/fonts'
import { normalize } from '../utils/screen-size'

type Props = {
    text: string,
    value: string,
    password?: boolean,
    onChangeValue: (value: string) => void
}

const InputWithLabel = ({text, value, password = false, onChangeValue}: Props) => {
    const [isPassword, setIsPassword] = useState(password);

    const changeSecurity = () => {
        setIsPassword(!isPassword);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.inputText}>{text}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeValue}
                    secureTextEntry={isPassword}
                />
                {password && 
                    <TouchableOpacity style={styles.showPasswordContainer} onPress={changeSecurity}>
                        <Image style={styles.showPasswordImage} source={require('../../assets/showpassword-eye.png')}/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default InputWithLabel

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 5,
        gap: normalize(10),
    },
    inputText: {
        height: 20,
        fontFamily: FONTS.Regular,
        fontSize: normalize(18),
    },
    inputContainer: {
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 8,
    },
    input: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(16),
        width: '100%',
        marginVertical: 8,
    },
    showPasswordContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        aspectRatio: 1,
        position: 'absolute',
        right: 0,
    },
    showPasswordImage: {
        width: '70%',
        height: '70%',
    }
})