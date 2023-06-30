import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from "jwt-decode";
import { Picker } from '@react-native-picker/picker';

import TopBar from '../../components/TopBar'
import InputWithLabel from '../../components/InputWithLabel'
import Button from '../../components/Button'

import { COLORS } from '../../constants/colors'
import { normalize } from '../../utils/screen-size';
import { FONTS } from '../../constants/fonts';

const { height, width } = Dimensions.get('window');

import { tokenAPI } from '../../api/API'

const AddPlanScreen = (props: any) => {
    const [name, setName] = useState('');
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const level = [
        {value: 1, label: 'easy'},
        {value: 2, label: 'medium'},
        {value: 3, label: 'hard'},
    ];

    const handleLogin = (e: Event) => {
        SecureStore.getItemAsync('access_token')
        .then((token) => {
            const tokenDecoded: any = jwt_decode(token!)
            tokenAPI.post(
                'workout/workoutplan/', 
                {
                    userId: tokenDecoded.user_id,
                    name: name,
                    level: selectedLevel,
                    photo_link: imageURL,
                    description: description,
                },
                {
                    headers: {
                        Authorization: 'JWT ' + token,
                    }
                }
            ).then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
        })
        props.navigation.navigate('PlanList');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopBar title='Add Workout Plan' backButton={true}/>
            <View style={styles.contentContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.formFieldsContainer}>
                        <InputWithLabel text={'Name'} value={name} onChangeValue={setName}/>
                        <InputWithLabel text={'Description'} value={description} onChangeValue={setDescription}/>
                        <InputWithLabel text={'Photo URL'} value={imageURL} onChangeValue={setImageURL}/>
                    </View>
                    <View style={styles.labelForPickerContainer}>
                        <Text style={styles.labelForPickerContainerText}>
                        Level:
                        </Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedLevel}
                            style={styles.pickerText}
                            itemStyle={styles.pickerItem}
                            onValueChange={(itemValue, itemIndex) => setSelectedLevel(itemValue)}
                            mode='dropdown'
                        >
                            {level.map((subitem, subindex) => {
                                return (
                                    <Picker.Item label={subitem.label} value={subitem.value}  key={subindex}/>
                                    )
                                })}
                        </Picker>
                    </View>
                    <Button 
                    text='Add'
                    onPress={handleLogin.bind(this)}
                    //onPress={navigation.navigate('Auth')}
                    style={styles.registerButton}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddPlanScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.backgroundColor
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: normalize(30),
        display: 'flex',
        flexDirection: 'column',
    },
    formContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: normalize(30),
    },
    formFieldsContainer:{
        gap: normalize(30),
    },
    registerButton: {
        width: width * 0.6,
    },
    pickerContainer: {
        backgroundColor: COLORS.whiteText,
    },
    labelForPickerContainer: {
    },
    labelForPickerContainerText: {
        fontFamily: FONTS.Regular,
        fontSize: normalize(18),
    },
    pickerText: {
        width: width, 
    },
    pickerItem: {
        marginVertical: -20,
    },
})