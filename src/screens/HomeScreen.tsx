import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Plans from '../components/Plans';

import { normalize } from '../utils/screen-size';
import { FONTS } from '../constants/fonts';
import WeekCalendar from '../components/WeekCalendar';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.greatingsContainer}>
                <Text style={styles.greatingsText}>Hi, Maciej</Text>
            </View>
            <ScrollView>
                <WeekCalendar/>
                <Plans/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(20),
    },
    greatingsContainer: {
        paddingVertical: normalize(10),
    },
    greatingsText: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(20),
    },

})