import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import InputWithLabel from '../../components/InputWithLabel'
import { COLORS } from '../../constants/colors'
import { normalize } from '../../utils/screen-size'
import { tokenAPI } from '../../api/API'
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

const { height, width } = Dimensions.get('window');

const AddWorkoutScreen = (props: any) => {
    const [name, setName] = useState('')
    const [workouts, setWorkouts] = useState('');
    const [exercises, setexercises] = useState([])

    const handleAddWorkout = () => {
        if(name == ''){
            console.log('workout name was not provided');
            Alert.alert('Ops!','workout name was not provided',[
                {text: 'Understood', onPress: () => console.log('alert closed')}
            ]);
            }
        else if(exercises.length == 0){
            console.log('workout name was not provided');
            Alert.alert('Ops!','exercise list is empty',[
                {text: 'Understood', onPress: () => console.log('alert closed')}
            ]);
        }
        else {
            SecureStore.getItemAsync('access_token')
            .then((token) => {
                const tokenDecoded: any = jwt_decode(token!)
                let workoutId: any;
                tokenAPI.post(
                    'workout/workoutplanday/', 
                    {
                        workoutPlanId: props.route.params.workoutPlanId,
                        name: name,
                        description: "description"
                    },
                    {
                        headers: {
                            Authorization: 'JWT ' + token,
                        }
                    }
                )
                .then(response => {
                    workoutId = response.data.id
                    props.route.params.exercises.forEach((value: any) => {
                        let exerciseId;
                        tokenAPI.post(
                            '/workout/set/', 
                            {
                                workoutPlanDayId: workoutId,
                                exerciseId: value.id
                            },
                            {
                                headers: {
                                    Authorization: 'JWT ' + token,
                                }
                            }
                        )
                        .then(response => {
                            console.log(response.data)
                            exerciseId = response.data.id
                            tokenAPI.post(
                                '/workout/reps/', 
                                {
                                    workoutPlanDayExerciseId: exerciseId,
                                    series: value.series,
                                    reps: value.repeat,
                                },
                                {
                                    headers: {
                                        Authorization: 'JWT ' + token,
                                    }
                                }
                            )
                            .then(response => {
                                console.log(response.data)
                            })
                            .catch(error => {
                                console.log(error.message)
                            })
                        })
                        .catch(error => {
                            console.log(error.message)
                        })
                    })
                })
                .catch(error => {
                    console.log(error.message)
                })
            })
            props.navigation.navigate('Workout');
        }
    };

    const updateExerciseList = () => {
        if(props.route.params.exercises === undefined){
            console.log("undefined");
        }
        else{
            console.log("UPDATE EXERCISE" + JSON.stringify(props.route.params.exercises));
            setexercises(props.route.params.exercises);
        } 
    };

    useEffect(() => {
        console.log(props.route.params.workoutPlanId)
    }, [])

    useEffect(() => {
        updateExerciseList()
    }, [props.route.params.exercises])

    const handleAddExercise = () => {
        props.navigation.navigate(
            'AddExercise',
            {
                workoutPlanId: props.route.params.id, 
                exercises: exercises
            }
        );
    }

    return (
    <SafeAreaView style={styles.container}>
        <TopBar title={'Add New Workout'} backButton={true}/>
        <View style={styles.inputContainer}>
            <InputWithLabel text={'Name'} value={name} onChangeValue={setName}/>
        </View>
        <View style={styles.contentContainer}> 
            <ScrollView>
                {exercises.map((item :any, index: number) => {
                    return(
                        <View> 
                            <View> 
                                <View>
                                    <View>
                                        <Image
                                        source={{uri: item.urlPhoto}}/>
                                    </View>
                                    <View>
                                        <Text>{item.name}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text>{item.repeat}</Text>
                                </View>
                                <View>
                                    <Text>{item.series}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
                <View>
                <Button 
                text='Add Exercise'
                onPress={handleAddExercise}
                style={styles.addButton}/>
                </View> 
                </ScrollView>
                <Button 
                text='Add Workout'
                onPress={handleAddWorkout}
                style={styles.addButton}/>
            </View>
    </SafeAreaView>
  )
}

export default AddWorkoutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: normalize(20),
        backgroundColor: COLORS.backgroundColor,
        gap: normalize(30),
    },
    contentContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: normalize(30),
    },
    inputContainer: {
    },
    addButton: {
        width: width * 0.6,
    },
})