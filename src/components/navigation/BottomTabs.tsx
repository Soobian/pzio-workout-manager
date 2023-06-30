import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/auth/HomeScreen';
import AnimatedTabButton from './AnimatedTabButton';
import { NavigationTab } from '../../types/tabsnavigation';
import ProfileScreen from '../../screens/auth/ProfileScreen';

const Tab = createBottomTabNavigator();

import { HOME, DUMBBELL, USER } from '../../../assets/icons';
import { normalize } from '../../utils/screen-size';
import { COLORS } from '../../constants/colors';
import WorkoutListScreen from '../../screens/auth/WorkoutListScreen';

const BottomTabs = () => {
    const Tabs : NavigationTab[] = [
        { route: 'Home', component: HomeScreen, label: 'Home', icon: HOME },
        { route: 'Workout', component: WorkoutListScreen, label: 'Workouts', icon: DUMBBELL },
        { route: 'Profile', component: ProfileScreen, label: 'Profile', icon: USER },
    ]

    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabsContainer,
        }}>
            {Tabs.map((tab, idx) => {
                return (
                    <Tab.Screen 
                    key={idx}
                    name={tab.route}
                    component={tab.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: (props) => <AnimatedTabButton item={tab} {...props} />
                    }}/>
                )
            })}
        </Tab.Navigator>
    )
}

export default BottomTabs

const styles = StyleSheet.create({
    tabsContainer: {
        position: 'absolute',
        height: normalize(70),
        paddingVertical: normalize(20),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.backgroundColor,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
})