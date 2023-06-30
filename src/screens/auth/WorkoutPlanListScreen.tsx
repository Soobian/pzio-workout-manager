import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import TopBar from '../../components/TopBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native';

import { tokenAPI } from '../../api/API';
import { COLORS } from '../../constants/colors';
import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';
import AddButton from '../../components/AddButton'

const { height, width } = Dimensions.get('window');

const WorkoutPlanListScreen = (props: any) => {
    const [workoutPlans, setWorkoutPlans] = useState<any>([]);
    const navigation = useNavigation();

    useEffect(() => {
        SecureStore.getItemAsync('access_token')
        .then((token) => {
            tokenAPI.get(
                'workout/workoutplan/', 
                {
                    headers: {
                        Authorization: 'JWT ' + token,
                    }
                }
            )
            .then(response => {
                setWorkoutPlans(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        })
    }, []);

    const handleButtonPress = () => {
        navigation.navigate('AddPlan');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopBar title='All Workout Plans' backButton={true}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                {workoutPlans.map((workoutDay: any, index: number) => {
                    return (
                        <View key={index} style={styles.workoutDayContainer}>
                            <TouchableOpacity style={styles.listContainer} 
                            onPress={ () => {
                                props.navigation.navigate(
                                    'WorkoutPlan', 
                                    {
                                        id: workoutDay.id,
                                        name: workoutDay.name, 
                                        level: workoutDay.level, 
                                        photoUrl: workoutDay.photo_link, 
                                        workouts: workoutDay.workoutplanday
                                    }
                                )
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
            <AddButton 
            signStyle={styles.addButtonText} 
            style={styles.addButtonContainer}
            onPress={handleButtonPress}/>
        </SafeAreaView>
    )
}

export default WorkoutPlanListScreen

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
        marginVertical: normalize(10),
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
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: normalize(25),
        right: normalize(25),
        width: normalize(50),
        aspectRatio: 1,
        backgroundColor: COLORS.blackColor,
        borderRadius: normalize(25),
    },
    addButtonText: {
        fontSize: normalize(30),
        fontFamily: FONTS.Bold,
        color: COLORS.whiteText,
    }
})