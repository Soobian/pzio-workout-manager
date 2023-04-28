import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../constants/colors';
import { normalize } from '../utils/screen-size';
import { FONTS } from '../constants/fonts';

const WeekCalendar = () => {
    const currentDay = new Date().getDay();

    const weekDays = [
        {
          fullname: 'Sunday',
          shortname: 'Sun',
        },
        {
          fullname: 'Monday',
          shortname: 'Mon',
        },
        {
          fullname: 'Tuesday',
          shortname: 'Tue',
        },
        {
          fullname: 'Wednesday',
          shortname: 'Wed',
        },
        {
          fullname: 'Thursday',
          shortname: 'Thu',
        },
        {
          fullname: 'Friday',
          shortname: 'Fri',
        },
        {
          fullname: 'Saturday',
          shortname: 'Sat',
        }
    ]

    return (
        <LinearGradient
        colors={[COLORS.gradientColorOne, COLORS.gradientColorTwo]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={[styles.container]}>
            {weekDays.map((day, index) => (
                <View key={index} style={index == currentDay ? styles.activeDay : styles.inactiveDay}>
                    <View style={index == currentDay ? styles.circleActive : styles.circle} />
                    <Text style={styles.dayname}>{day.shortname}</Text>
                </View>
            ))}
        </LinearGradient>
    )
}

export default WeekCalendar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: normalize(10),
        borderRadius: normalize(10),
        marginVertical: normalize(5),
    },
    activeDay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveDay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle : {
        width: normalize(10),
        aspectRatio: 1,
        borderRadius: normalize(10 / 2),
        backgroundColor: '#fff',
        opacity: 0.3,
        marginBottom: normalize(5),
    },
    circleActive : {
        width: normalize(10),
        aspectRatio: 1,
        borderRadius: normalize(10 / 2),
        backgroundColor: "#fff",
        marginBottom: normalize(5),
    },
    dayname : {
        fontFamily: FONTS.Bold,
        fontSize: normalize(14),
        color: "#fff"
    },
})