import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { FONTS } from '../constants/fonts';
import { normalize } from '../utils/screen-size';

const { height, width } = Dimensions.get('window');

const Plan = ({ name }: { name: string }) => {
    return (
        <TouchableOpacity style={styles.planContainer}>
            <ImageBackground
            source={require('../../assets/placeholder.png')} 
            resizeMode="cover"
            style={styles.planBackgroundImageContainer} 
            imageStyle={styles.planBackgroundImage}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const Plans = () => {
    const data = [
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' },
        { name: 'Item 4' },
        { name: 'Item 5' },
    ]

    return (
        <View>
            <ScrollView 
            horizontal = {true} 
            keyboardShouldPersistTaps = 'always'
            showsHorizontalScrollIndicator = {false} 
            style={styles.plansScroll}>
                {data.map((item, index) => (
                    <Plan key={index} name={item.name}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default Plans

const styles = StyleSheet.create({
    planContainer: {
        flex: 1,
        display: 'flex',
        marginHorizontal: normalize(10),
        marginVertical: normalize(5),
    },
    planBackgroundImageContainer: {
        aspectRatio: 4/3,
        height: height/4,
        borderRadius: normalize(10),
    },
    planBackgroundImage: {
        borderRadius: normalize(10),
        borderWidth: 2,
        borderColor: '#afafaf',
    },
    plansScroll: {
        display: 'flex',
        paddingVertical: normalize(5),
        marginHorizontal: normalize(-5),
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