import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store'

import { tokenAPI } from '../../api/API';
import { COLORS } from '../../constants/colors';
import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';

import { useNavigation } from '@react-navigation/native';
import TopBar from '../../components/TopBar';

const { height, width } = Dimensions.get('window');

const WorkoutListScreen = ({ route, navigation }: {route: any, navigation: any}) => {
    const [workoutDays, setWorkoutDays] = useState<any>([]);

    useEffect(() => {
        SecureStore.getItemAsync('access_token')
        .then((token) => {
            tokenAPI.get(
                'workout/workoutplanday/', 
                {
                    headers: {
                        Authorization: 'JWT ' + token,
                    }
                }
            )
            .then(response => {
                setWorkoutDays(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        })
    }, []);

    return (
        <View style={styles.container}>
            <TopBar title='All Workouts'/>
            <ScrollView style={{marginBottom: 80}} showsVerticalScrollIndicator={false}>
                {workoutDays.map((workoutDay: any, index: number) => {
                    return (
                        <View key={index} style={styles.workoutDayContainer}>
                            <TouchableOpacity style={styles.listContainer} 
                            onPress={ () => {
                                navigation.navigate('Workout')
                            }}>
                                <ImageBackground
                                source={require('../../../assets/placeholder.png')}
                                resizeMode="cover"
                                style={styles.backgroundImageContainer} 
                                imageStyle={styles.backgroundImage}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{workoutDay.name}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default WorkoutListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: normalize(20),
        backgroundColor: COLORS.backgroundColor,
    },
    workoutDayContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        display: 'flex',
        marginHorizontal: normalize(10),
        marginVertical: normalize(5),
    },
    backgroundImageContainer: {
        flex: 1,
        aspectRatio: 3/2,
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