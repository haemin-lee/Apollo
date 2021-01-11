<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import {
    useColorScheme,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar,
    Pressable,
} from 'react-native'

import RootStackNavigator from '@app/navigation/RootStackNavigator.js'

import Color from './theme/color'

function App() {
    const colorScheme = useColorScheme()

    return (
        <KeyboardAvoidingView
            style={{
                backgroundColor:
                    colorScheme === 'light'
                        ? Color.light.backgroundColor
                        : Color.dark.backgroundColor,
                flex: 1,
            }}
            behavior="padding"
        >
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <StatusBar
                    barStyle={
                        colorScheme === 'light'
                            ? 'dark-content'
                            : 'light-content'
                    }
                />
                <RootStackNavigator />
            </Pressable>
        </KeyboardAvoidingView>
    )
}

export default App
=======
import React, { useState, useEffect } from 'react'
import {
    useColorScheme,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar,
    Pressable,
} from 'react-native'

import { Provider } from 'react-redux'
import store from './redux'

import RootStackNavigator from '@app/navigation/RootStackNavigator.js'

import Color from './theme/color'

function App() {
    const colorScheme = useColorScheme()

    return (
        <Provider store={store}>
            <KeyboardAvoidingView
                style={{
                    backgroundColor:
                        colorScheme === 'light'
                            ? Color.light.backgroundColor
                            : Color.dark.backgroundColor,
                    flex: 1,
                }}
                behavior="padding"
            >
                <Pressable
                    onPress={() => Keyboard.dismiss()}
                    style={{ flex: 1 }}
                >
                    <StatusBar
                        barStyle={
                            colorScheme === 'light'
                                ? 'dark-content'
                                : 'light-content'
                        }
                    />
                    <RootStackNavigator />
                </Pressable>
            </KeyboardAvoidingView>
        </Provider>
    )
}

export default App
>>>>>>> 7a0e7bc71a1dba40ccb218757c6b5bb637461c51
