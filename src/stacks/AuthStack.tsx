import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import BottomTabs from '../components/navigation/BottomTabs'
import { COLORS } from '../constants/colors'

const AuthStack = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <BottomTabs/>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.backgroundColor,
    },
})

export default AuthStack