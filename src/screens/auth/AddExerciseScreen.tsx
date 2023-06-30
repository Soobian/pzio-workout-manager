import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { tokenAPI } from '../../api/API'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants/colors'
import Checkbox from 'expo-checkbox';
import InputWithLabel from '../../components/InputWithLabel'
import TopBar from '../../components/TopBar'
import { normalize } from '../../utils/screen-size'
import Button from '../../components/Button'

const { height, width } = Dimensions.get('window');

const AddExerciseScreen = (props: any) => {
    const [selectedExercise, setSelectedExercise] = useState<any>('')
    const [series, setSeries] = useState('')
    const [repeat, setRepeat] = useState('')
    console.log(props.route.params.exercises)
    const [exercises, setExercises] = useState<any>(props.route.params.exercises)
    const [exerciseList, setexerciseList] = useState<any>([]);
    const [initialRun, setInitialRun] = useState(true);

    const handleAddExercise = () => {
        if(series == '' || repeat == ''){
            Alert.alert('Ops!','You have not filled all forms',[
                {text: 'Understood', onPress: () => console.log('alert closed')}
            ]);
        }
        else if(selectedExercise == ''){
            Alert.alert('Ops!','No exercise was selected',[
                {text: 'Understood', onPress: () => console.log('alert closed')}
            ]);
        }
        else{
            console.log('{exerciseId: ' + selectedExercise + ', series: '+ series +
            ',  repeat: '+ repeat + '}');
            
            if(props.route.params === undefined){
                console.log("undefined");
            }
            else{
                const newExercise = {
                    id: selectedExercise + 1, 
                    name: exerciseList[selectedExercise].name, 
                    repeat: repeat, 
                    series: series,
                    urlPhoto: '123',
                };
                console.log(exercises)
                setExercises((exercises: any) => [...exercises, newExercise])
            } 
            
        }
    };

    useEffect(() => {
        if(!initialRun) {
            console.log("EXERCISE SEND " + JSON.stringify(exercises));
            props.navigation.navigate('AddWorkout', {workoutPlanId: props.route.params.workoutPlanId, exercises: exercises})
        }
        else {
            setInitialRun(false);
        }
    }, [exercises])

    useEffect(() => {
        tokenAPI.get(
            'workout/exercise/', 
        )
        .then(response => {
            setexerciseList(response.data)
        })
        .catch(error => {
            console.log(error.message)
        })
    }, [])

    const handleSelection = (id: any) => {
        // only one box can be selected
        console.log("selected exercise id: ", id);
        const newValue = exerciseList.map((checkbox: any, i: number) => {
            if (i !== id)
                return {
                ...checkbox,
                selected: false,
            }
            if (i === id) {
                const item = {
                ...checkbox,
                selected: !checkbox.selected,
                }
                return item
            }
            return checkbox
        })
        if(newValue[id].selected === true){
            setSelectedExercise(id);
        }
        else{
            setSelectedExercise('');
        }
        setexerciseList(newValue)
        console.log("[AddExeToWorkout] ", newValue[id].selected, {selectedExercise});
    };

    return (
        <SafeAreaView style={styles.container}>
            <TopBar title='Add New Exercise' backButton={true}/>
            <View style={styles.contentContainer}>
                <InputWithLabel text={'Series'} value={series} onChangeValue={setSeries}/>
                <InputWithLabel text={'Repeats'} value={repeat} onChangeValue={setRepeat}/>
            </View>
            <Text style={styles.titleExerciseText}>Exercises:</Text>
            <View style={styles.exercisesToSelectContainer}> 
            <ScrollView contentContainerStyle={styles.scrollView}
            centerContent>
                    {exerciseList.map((item:any, index:any) => {
                    return(
                        <View key={index} style={styles.containerFOrExerciseAndCheckBox}> 
                            <View style={styles.singleExerciseWithPhotoContainer}>
                                <Text>{item.name}</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                    <Checkbox
                                    value={item.selected}
                                    onValueChange={() => handleSelection(index)}
                                    style={styles.checkbox}
                                    />
                            </View>
                        </View>
                        )
                })}
                </ScrollView>
            </View>
            
            <View style={styles.addButtonContainer}>
                <Button 
                text='Add Workout'
                onPress={handleAddExercise}
                style={styles.addButton}/>
            </View> 
        </SafeAreaView>
    )
}

export default AddExerciseScreen

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
        width: '80%',
        borderRadius: 20,
        paddingTop: 10,
        height: 350,
        alignItems: 'center',
    },

    /** CREATE WORKOUT button */
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    button: {
        backgroundColor: '#03767B',
        width: '90%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#03767B',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    
    /**
     * upper blue container */ 
    upperContener:{
        backgroundColor: '#03767B',
        width: '103%',
        height: '18%',
        fontSize: 16,
        borderRadius: 10,
        paddingBottom: 20,
    },
    upperContenerText:{
        color: COLORS.whiteText,
        fontWeight: '700',
        fontSize: 28,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'bottom',
        position: 'absolute',  
        bottom: 20,
        left: 30,
    },
    
    untouchableContainer: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    wholeContainer: {
        width: 180,
        alignItems: 'center',
        paddingBottom: 15,
        marginBottom: 10,
    },
    labelsCointeiner: {
        paddingTop: 10,
        width: '90%',
        alignItems: 'center',
        paddingBottom: 20,
    },
    floatingLabelInputContainerStyle: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        fontWeight: "500",
        width: 60,
        fontSize: 12
    },
    
    pickerContainer: {
        backgroundColor: COLORS.whiteText,
        height: 30,
        borderRadius: 4,
    },
    labelForPickerContainer: {
        height: 40,
        borderRadius: 4,
        width: 90,
        left: -10,
    },
    labelForPickerContainerText: {
        color: COLORS.blackColor,
        fontSize: 15,
        marginVertical: 10,
        left: 60,
    },
    pickerText: {
        height: 30, 
        width: 130, 
        color: COLORS.blackColor
    },

    // exercises
    titleText: {
        color: COLORS.blackColor,
        fontWeight: '900',
        fontSize: 16,
        paddingBottom: 3
    },
    addedExercisesContainer: {
        borderRadius: 10,
        marginBottom: 7,
        paddingVertical: 5,
        width: '95%',
        height: '45%',

    },
    /**
     * container which enables scrolling
     */
    scrollView: {
        width: '100%',
        alignItems: 'center',
    },
    /**
     * container for whole exercise
     */
    singleExerciseContainer: {
        backgroundColor: COLORS.blackColor,
        borderColor: COLORS.blackColor,
        borderWidth: 1,
        width: '90%',
        height: 80,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    rowDivisionContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        flexDirection: "row" ,
        justifyContent: 'space-evenly',
    },
    
    exerciseNameContainer: {
        backgroundColor: COLORS.blackColor,
        width: '50%',
        height: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    repeatAndSeriesContainer: {
        width: '25%',
        height:'98%',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(200, 200, 200, 0.1)',
        borderRadius: 8
    },
    nameText: {
        color: COLORS.blackColor,
        fontSize: 17,
    },
    numberText: {
        color: COLORS.whiteText,
        fontSize: 20,
        marginTop: 25,
        left: -5,
    },

    /**
     * exercise button
     */
    exerciseButtonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseButton: {
        backgroundColor: '#03767B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    exerciseButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },

    // CREATE WORKOUT
    imageContenerAddWorkout: {
        backgroundColor: COLORS.blackColor,
        width: '100%',
        height: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageAddWorkout: {
        backgroundColor: 'black',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    workoutNameContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        justifyContent: 'center', alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    workoutNameText: {
        color: COLORS.whiteText,
        fontSize: 20,
        fontWeight: '900',
    },

    /**
     *  SELECT EXERICISE specific container
     **/
    exercisesToSelectContainer: {
        borderRadius: 10,
        marginBottom: 7,
        paddingTop: 10,
        width: 320,
        height: 260,
        marginTop: 10,
    },
    titleExerciseText: {
        color: COLORS.blackColor,
        fontWeight: '900',
        fontSize: 18,
        paddingTop: 20,
    },
    imageContener: {
        backgroundColor: COLORS.blackColor,
        width: '40%',
        height: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        backgroundColor: COLORS.blackColor,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '98%',
        width: '98%',
    },

/***********************************************/
    // SELECT EXERCISE
    containerFOrExerciseAndCheckBox: {
        width: '90%',
        height: 70,
        borderRadius: 8,
        flexDirection: "row" ,
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
    singleExerciseWithPhotoContainer: {
        width: '85%',
        height: 70,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: COLORS.whiteText,
    },
    checkbox: {
        alignSelf: "center",
        backgroundColor: 'black',
        color: 'black',
      },
    checkboxContainer: {
        width: '9%',
        height: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowDivisionContainerForExercise: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        flexDirection: "row" ,
        justifyContent: 'space-evenly',
    },
    exerciseNameContainerS: {
        backgroundColor: COLORS.blackColor,
        width: '60%',
        borderRadius: 8,
        alignItems: 'center'
    },
    exercisenameText: {
        color: COLORS.whiteText,
        fontSize: 18,
        marginTop: 22,
    },
    imageContenerForExercise: {
        backgroundColor: COLORS.blackColor,
        width: '40%',
        height: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageExercise: {
        backgroundColor: COLORS.blackColor,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        opacity: 0.7
    },
    labelsCointeiner2: {
        paddingTop: 10,
        width: 60,
        alignItems: 'center',
    },
    floatingLabelExercise: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        fontWeight: "500",
        width: 30
    },
    labelNameContianer: {
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 15,
    },
    labelNameText : {
        fontSize: 18,
        color: COLORS.blackColor,
    },

    /**
     * button 'add exercise to workout'
     */
    addButtonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addexerciseButton: {
        backgroundColor: '#03767B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    addexerciseButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    addButton: {
        width: width * 0.6,
    },
})