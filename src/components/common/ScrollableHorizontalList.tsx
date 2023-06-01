import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React from 'react'

import { FONTS } from '../../constants/fonts';
import { normalize } from '../../utils/screen-size';

const { height, width } = Dimensions.get('window');

const ListElement = ({ name }: { name: string }) => {
    return(
        <TouchableOpacity style={styles.listContainer}>
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

const ScrollableHorizontalList = (props: any) => {
    const data = [
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' },
        { name: 'Item 4' },
        { name: 'Item 5' },
    ]

    return (
        <ScrollView 
        horizontal = {true} 
        keyboardShouldPersistTaps = 'always'
        showsHorizontalScrollIndicator = {false} 
        style={styles.container}>
            {data.map((item, index) => (
                <ListElement key={index} name={item.name}/>
            ))}
        </ScrollView>
    )
}

export default ScrollableHorizontalList

const styles = StyleSheet.create({
    container: {
        paddingVertical: normalize(5),
        marginHorizontal: normalize(-5),
    },
    listContainer: {
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