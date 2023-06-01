import { StyleSheet, Text, View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing, event } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { NavigationTab } from '../../types/tabsnavigation';

import { COLORS } from '../../constants/colors';
import { normalize } from '../../utils/screen-size';
import Icon from '../Icon';

interface Props extends BottomTabBarButtonProps {
    item: NavigationTab;
}

const AnimatedTabButton = (props: Props) => {
    const { item, onPress, accessibilityState } = props;
    const [originalPosition, setOriginalPosition] = useState(0);
    const translateY = useSharedValue(0);
    const scaleButton = useSharedValue(0);

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value}, { scale: scaleButton.value}],
        };
    });

    const startAnimation = () => {
        if (accessibilityState?.selected) {
            scaleButton.value = withTiming(1.2, {duration: 300 });
        } else {
            scaleButton.value = withTiming(1, {duration: 300 });
        }
    };

    const onLayout = (event: LayoutChangeEvent) => {
        setOriginalPosition(event.nativeEvent.layout.y);
    };

    useEffect(() => {
        startAnimation();
    }, [accessibilityState?.selected])

    return (
        <Animated.View
        style={[styles.buttonContainer, animatedButtonStyle]}
        onLayout={onLayout}>
            <TouchableOpacity
            style={styles.button}
            onPress={onPress}>
                <Icon 
                path={item.icon} 
                color={COLORS.accentColor}
                style={{ height: 30, aspectRatio: 1}}/>
            </TouchableOpacity>
        </Animated.View>
      );
}

export default AnimatedTabButton

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearContainer: {
        width: normalize(50),
        height: normalize(50),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(10),
        borderColor: COLORS.backgroundColor,
    },
    button: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
  });