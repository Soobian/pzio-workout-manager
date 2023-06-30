import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/TopBar'



const WorkoutScreen = ({route, navigation}: {route: any, navigation: any}) => {
    return (
        <SafeAreaView>
            <TopBar title='' backButton={true}/>
            <Text>WorkoutScreen</Text>
        </SafeAreaView>
    )
}

export default WorkoutScreen

const styles = StyleSheet.create({})