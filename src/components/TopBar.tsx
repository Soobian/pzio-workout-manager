import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import { FONTS } from '../constants/fonts';
import { normalize } from '../utils/screen-size';

type Props = {
    title?: string;
}

const TopBar = ({title}: Props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchContainer} onPress={navigation.goBack}>
                <Image style={styles.touchImage} source={require('../../assets/back-arrow.png')}/>
            </TouchableOpacity>
            <Text style={styles.topText}>{title ? title : ''}</Text>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(15),
    },
    touchContainer: {
        display: 'flex',
    },
    touchImage: {
        width: 30,
        height: 30,
    },
    topText: {
        flex: 2,
        fontSize: 16,
        fontFamily: FONTS.Regular,
        textAlign: 'center',
        marginRight: normalize(30),
    }
})