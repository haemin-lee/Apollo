import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Auth from '../screens/auth'
import CheckIn from '../screens/check-in'

const Stack = createStackNavigator()

function RootStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth" headerMode="none">
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Check In" component={CheckIn} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator
