import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
    return (
        <View>
            <ActivityIndicator size="large" />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({})