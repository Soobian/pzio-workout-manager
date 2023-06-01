import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-gifted-charts'

import { COLORS } from '../../constants/colors';
import { MAN, WOMAN, BICEPS, WAIST, CHEST, QUADS } from '../../../assets/icons'
import { normalize } from '../../utils/screen-size';
import Icon from '../../components/Icon';
import { FONTS } from '../../constants/fonts';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import TouchableText from '../../components/TouchableText';
import Workout from '../../components/profile/Workout';


const ProfileScreen = () => {
    const data1 = [{value: 10}, {value: 20}, {value: 15}, {value: 40}, {value: 50}, {value: 60}, {value: 45}, {value: 60}, {value:35}, {value: 30}, {value: 140}, {value: 140}, {value: 140}]

    const data2 = [{value: 120, dataPointText: '120'}, {value: 115, dataPointText: '115'}, {value: 110, dataPointText: '110'}, {value: 120, dataPointText: '120'}, {value: 115, dataPointText: '115'}]

    const [data, setData] = useState(data1)

    const customDataPoint = () => {
        return (
            <View style={styles.measurementDataPoint}/>
        );
    };

    const customLabel = (value: any) => {
        return (
            <View style={styles.measurementLabel}>
                <Text style={{color: 'lightgray',fontSize:12}}>{2018}</Text>
                <Text style={{color: 'white', fontWeight:'bold'}}>{value}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <LinearGradient
                colors={[COLORS.gradientColorOne, COLORS.gradientColorTwo]}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={[styles.imageContainer]}>
                    <Icon 
                    style={styles.image}
                    path={ true ? MAN : WOMAN}/>
                </LinearGradient>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{"Maciej Ciepał"}</Text>
                    <Text style={styles.emailText}>{"maciejciepal@gmail.com"}</Text>
                </View>
            </View>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View style={styles.seeAllContainer}>
                    <Text style={styles.seeAllText}>Recent Measurements</Text>
                    <TouchableText
                    text='See All'
                    textStyle={styles.seeAllTouchText}
                    onPress={()=>{}}/>
                </View>
                <View style={{flex: 1}}>
                    <LineChart
                    customDataPoint={customDataPoint}
                    areaChart
                    isAnimated
                    showVerticalLines
                    textColor="black"
                    textFontSize={normalize(15)}
                    textShiftY={-8}
                    textShiftX={10}
                    dataPointsHeight={20}
                    dataPointsWidth={20}
                    noOfSections={5}
                    animationDuration={500}
                    startFillColor={COLORS.gradientColorTwo}
                    endFillColor={COLORS.gradientColorOne}
                    startOpacity={1}
                    endOpacity={0.5}
                    initialSpacing={0}
                    thickness={3}
                    spacing={normalize(50)}
                    maxValue={150}
                    verticalLinesColor="black"
                    color={COLORS.gradientColorTwo}
                    yAxisColor="lightgray"
                    xAxisColor="lightgray"
                    rulesColor="lightgray"
                    verticalLinesColor="lightgray"
                    data={data}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <ButtonWithIcon path={BICEPS} style={styles.button} iconStyle={styles.buttonIcon} onPress={()=>setData(data2)}/>
                    <ButtonWithIcon path={CHEST} style={styles.button} iconStyle={styles.buttonIcon} onPress={()=>setData(data1)}/>
                    <ButtonWithIcon path={WAIST} style={styles.button} iconStyle={styles.buttonIcon}/>
                    <ButtonWithIcon path={QUADS} style={styles.button} iconStyle={styles.buttonIcon}/>
                </View>
                <View style={styles.seeAllContainer}>
                    <Text style={styles.seeAllText}>Recent Workouts</Text>
                    <TouchableText
                    text='See All'
                    textStyle={styles.seeAllTouchText}
                    onPress={()=>{console.log(1)}}/>
                </View>
                <View style={styles.workoutsContainer}>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                    <Workout/>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.backgroundColor,
        paddingHorizontal: normalize(20),
        marginBottom: 80,
    },
    infoContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        gap: 20,
    },
    imageContainer: {
        height: normalize(120),
        aspectRatio: 1,
        borderRadius: normalize(30),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: normalize(80),
        aspectRatio: 1,
        tintColor: COLORS.whiteText,
    },
    textContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: normalize(10),
    },
    nameText: {
        fontFamily: FONTS.Black,
        fontSize: normalize(30),
    },
    emailText: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(20),
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        height: normalize(60),
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(15)
    },
    buttonIcon: {
        height: normalize(40),
        aspectRatio: 1,
        tintColor: COLORS.whiteText,
    },
    measurementDataPoint: {
        width: 0,
        height: 0,
    },
    measurementLabel: {
        height: normalize(50),
        aspectRatio: 2,
        backgroundColor: '#282C3E',
        borderRadius: normalize(10),
        justifyContent:'center',
        paddingLeft: 16,
    },
    seeAllContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: normalize(20),
    },
    seeAllText: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(18),
    },
    seeAllTouchText: {
        fontFamily: FONTS.Bold,
        fontSize: normalize(18),
    },
    workoutsContainer: {
        gap: normalize(10),
    }
})