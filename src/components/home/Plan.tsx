import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React from 'react'

import { normalize } from '../../utils/screen-size'

import { FONTS } from '../../constants/fonts';

const { height, width } = Dimensions.get('window');

const Plan = ({ name }: { name: string }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <ImageBackground
            source={require('../../../assets/placeholder.png')} 
            resizeMode="cover"
            style={styles.backgroundImageContainer} 
            imageStyle={styles.backgroundImage}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                    <View>
                        
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default Plan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        marginHorizontal: normalize(10),
        marginVertical: normalize(5),
    },
    backgroundImageContainer: {
        aspectRatio: 4/3,
        height: height/4,
        borderRadius: normalize(10),
    },
    backgroundImage: {
        borderRadius: normalize(10),
        borderWidth: 2,
        borderColor: '#afafaf',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: FONTS.Bold,
        fontSize: normalize(20),
    }
})