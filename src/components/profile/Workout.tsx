import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import { normalize } from '../../utils/screen-size'
import { FONTS } from '../../constants/fonts'
import { COLORS } from '../../constants/colors';

type Props = {

}

const Workout = ({}: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Workout</Text>
            <LinearGradient 
            colors={[COLORS.gradientColorOne, COLORS.gradientColorTwo]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.gradientContainer}>
                <Text style={styles.text}>19-01-2022</Text>
            </LinearGradient>
        </View>
    )
}

export default Workout

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: normalize(10),
        borderWidth: 2,
        borderColor: '#afafaf',
    },
    text: {
        fontFamily: FONTS.Regular,
        padding: normalize(15),
    }, 
    gradientContainer: {
    
    }
})