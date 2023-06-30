import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../../constants/colors';
import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';

import TopBar from '../../components/TopBar';
import AddButton from '../../components/AddButton';

const { height, width } = Dimensions.get('window');

const WorkoutPlanScreen = (props: any) => {
    const [workoutDays, setworkoutDays] = useState([]);

    useEffect(() => {
        setworkoutDays(props.route.params.workouts)
    }, []);

    const handleButtonPress = () => {
        props.navigation.navigate(
            'AddWorkout',
            {
                workoutPlanId: props.route.params.id, 
                exercises: undefined
            }
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopBar title={'Workout Plan: ' + props.route.params.name} backButton={true}/>
            <ScrollView style={{marginBottom: 80}} showsVerticalScrollIndicator={false}>
                {workoutDays.map((workoutDay: any, index: number) => {
                    return (
                        <View key={index} style={styles.workoutDayContainer}>
                            <TouchableOpacity style={styles.listContainer} 
                            onPress={ () => {
                                props.navigation.navigate('Workout')
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

export default WorkoutPlanScreen

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