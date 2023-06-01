import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScrollableHorizontalList from '../../components/common/ScrollableHorizontalList';

import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';
import WeekCalendar from '../../components/home/WeekCalendar';
import Plan from '../../components/home/Plan';
import TouchableText from '../../components/TouchableText';
import { COLORS } from '../../constants/colors';
import Workout from '../../components/home/Workout';

const HomeScreen = () => {
    const data = [
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' },
        { name: 'Item 4' },
        { name: 'Item 5' },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.greatingsContainer}>
                <Text style={styles.greatingsText}>Hi, Maciej</Text>
            </View>
            <ScrollView style={{marginBottom: normalize(70)}}>
                <WeekCalendar/>
                <View>
                    <View style={styles.seeAllContainer}>
                        <Text style={styles.seeAllText}>Current Plan's Workouts</Text>
                        <TouchableText 
                        text='See All'
                        textStyle={styles.seeAllTouchText}
                        onPress={()=>{}}/>
                    </View>
                    <ScrollableHorizontalList/>
                </View>
                <View>
                    <View style={styles.seeAllContainer}>
                        <Text style={styles.seeAllText}>Recommended Workouts</Text>
                        <TouchableText 
                        text='See All'
                        textStyle={styles.seeAllTouchText}
                        onPress={()=>{}}/>
                    </View>
                    <ScrollableHorizontalList/>
                </View>
                <View>
                    <View style={styles.seeAllContainer}>
                        <Text style={styles.seeAllText}>Explore New Exercises</Text>
                        <TouchableText 
                        text='See All'
                        textStyle={styles.seeAllTouchText}
                        onPress={()=>{}}/>
                    </View>
                    <ScrollableHorizontalList/>
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: normalize(20),
        backgroundColor: COLORS.backgroundColor,
    },
    greatingsContainer: {
        paddingVertical: normalize(10),
    },
    greatingsText: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(22),
    },
    seeAllContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: normalize(20),
    },
    seeAllText: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(18),
    },
    seeAllTouchText: {
        fontFamily: FONTS.Bold,
        fontSize: normalize(18),
    }
})