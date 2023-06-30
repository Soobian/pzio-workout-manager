import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-gifted-charts'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from "jwt-decode";
import { useIsFocused } from "@react-navigation/native";

import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { MAN, WOMAN, BICEPS, WAIST, CHEST, QUADS } from '../../../assets/icons'

import { normalize } from '../../utils/screen-size';
import { tokenAPI } from '../../api/API';

import Icon from '../../components/Icon';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import TouchableText from '../../components/TouchableText';
import Workout from '../../components/profile/Workout';


type PlotItem = {
    value: number,
}

const ProfileScreen = () => {
    const isFocused = useIsFocused();
    const [chestData, setChestData] = useState<PlotItem[]>([])
    const [quadsData, setQuadsData] = useState<PlotItem[]>([])
    const [bicepsData, setBicepsData] = useState<PlotItem[]>([])
    const [waistData, setWaistData] = useState<PlotItem[]>([])
    const [data, setData] = useState<PlotItem[]>([])
    
    useEffect(() => {
        if(isFocused){
            SecureStore.getItemAsync('access_token')
            .then((token) => {
                const tokenDecoded: any = jwt_decode(token!)
                tokenAPI.get(
                    'measurements/user/' + tokenDecoded.user_id, 
                    {
                        headers: {
                            Authorization: 'JWT ' + token,
                        }
                    }
                )
                .then(response => {
                    var chestDataTemp: PlotItem[] = []
                    var quadsDataTemp: PlotItem[] = []
                    var bicepsDataTemp: PlotItem[] = []
                    var waistDataTemp: PlotItem[] = []
                    response.data.map((obj: any) => {
                        chestDataTemp.push({value: obj.chestSize})
                        quadsDataTemp.push({value: obj.thighSize})
                        bicepsDataTemp.push({value: obj.thighSize})
                        waistDataTemp.push({value: obj.waistSize})
                    })
                    setChestData(chestDataTemp)
                    setQuadsData(quadsDataTemp)
                    setBicepsData(bicepsDataTemp)
                    setWaistData(waistDataTemp)
                    setData(bicepsData)
                })
                .catch(error => {
                    console.log(error)
                })
            })
        }
    }, [])

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
                    <ButtonWithIcon path={BICEPS} style={styles.button} iconStyle={styles.buttonIcon} onPress={()=>setData(bicepsData)}/>
                    <ButtonWithIcon path={CHEST} style={styles.button} iconStyle={styles.buttonIcon} onPress={()=>setData(chestData)}/>
                    <ButtonWithIcon path={WAIST} style={styles.button} iconStyle={styles.buttonIcon} onPress={()=>setData(waistData)}/>
                    <ButtonWithIcon path={QUADS} style={styles.button} iconStyle={styles.buttonIcon} onPress={()=>setData(quadsData)}/>
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