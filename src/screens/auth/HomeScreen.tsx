import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store'
import { useIsFocused } from "@react-navigation/native";

import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

import WeekCalendar from '../../components/home/WeekCalendar';
import ScrollableHorizontalList from '../../components/common/ScrollableHorizontalList';
import Plan from '../../components/home/Plan';
import TouchableText from '../../components/TouchableText';
import Workout from '../../components/home/Workout';
import { tokenAPI } from '../../api/API';

const HomeScreen = (props: any) => {
    const isFocused = useIsFocused();
    const [plans, setPlans] = useState<any>([]);
    const [exercises, setExercises] = useState<any>([]);

    useEffect(() => {
        SecureStore.getItemAsync('access_token')
        .then((token) => {
            const tokenDecoded: any = jwt_decode(token!)
            tokenAPI.get(
                'user/parameters/' + tokenDecoded.user_id + '/', 
                {
                    headers: {
                        Authorization: 'JWT ' + token,
                    }
                }
            )
            .then(response => {
                
            })
            .catch(error => {
                console.log(error)
            })
            
            tokenAPI.get(
                'workout/exercise/', 
                {
                    headers: {
                        Authorization: 'JWT ' + token,
                    }
                }
            )
            .then(response => {
                
            })
            .catch(error => {
                console.log(error)
            })
        })
    }, []);

    useEffect(() => {
        if(isFocused){
            SecureStore.getItemAsync('access_token')
            .then((token) => {
                const tokenDecoded: any = jwt_decode(token!)
                tokenAPI.get(
                    'workout/workoutplan/', 
                    {
                        headers: {
                            Authorization: 'JWT ' + token,
                        }
                    }
                )
                .then(response => {
                    setPlans(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
                tokenAPI.get(
                    'workout/exercise/', 
                    {
                        headers: {
                            Authorization: 'JWT ' + token,
                        }
                    }
                )
                .then(response => {
                    setExercises(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
            })
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.greatingsContainer}>
                <Text style={styles.greatingsText}>Hi, Maciej</Text>
            </View>
            <ScrollView style={{marginBottom: 80}} showsVerticalScrollIndicator={false}>
                <WeekCalendar/>
                <View>
                    <View style={styles.seeAllContainer}>
                        <Text style={styles.seeAllText}>Workout Plans</Text>
                        <TouchableText 
                        text='See All'
                        textStyle={styles.seeAllTouchText}
                        onPress={()=>{props.navigation.navigate("PlanList")}}/>
                    </View>
                    <ScrollableHorizontalList data={plans}/>
                </View>
                <View>
                    <View style={styles.seeAllContainer}>
                        <Text style={styles.seeAllText}>Recommended Workouts</Text>
                        <TouchableText 
                        text='See All'
                        textStyle={styles.seeAllTouchText}
                        onPress={()=>{props.navigation.navigate("Workout")}}/>
                    </View>
                    <ScrollableHorizontalList data={plans}/>
                </View>
                <View>
                    <View style={styles.seeAllContainer}>
                        <Text style={styles.seeAllText}>Explore New Exercises</Text>
                        <TouchableText 
                        text='See All'
                        textStyle={styles.seeAllTouchText}
                        onPress={()=>{}}/>
                    </View>
                    <ScrollableHorizontalList data={exercises}/>
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