import React from 'react'
import { useColorScheme } from 'react-native'

import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Auth from '../screens/auth'
import Home from '../screens/home'
import CheckInNavigator from './CheckInNavigator'

import Color from '../theme/color'

const Stack = createStackNavigator()

const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Color.light.backgroundColor,
    },
}

const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: Color.dark.backgroundColor,
    },
}

function RootStackNavigator() {
    const colorScheme = useColorScheme()

    return (
        <NavigationContainer
            theme={colorScheme === 'light' ? lightTheme : darkTheme}
        >
            <Stack.Navigator initialRouteName="Auth" headerMode="none">
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Check In" component={CheckInNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator
