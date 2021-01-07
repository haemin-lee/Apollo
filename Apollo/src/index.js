import React from 'react'
import {
    Appearance,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar,
    Pressable,
} from 'react-native'

import RootStackNavigator from '@app/navigation/RootStackNavigator.js'

import Color from './theme/color'

function App() {
    return (
        <KeyboardAvoidingView
            style={{
                backgroundColor:
                    Appearance.getColorScheme() === 'light'
                        ? Color.light.backgroundColor
                        : Color.dark.backgroundColor,
                flex: 1,
            }}
            behavior="padding"
        >
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <StatusBar
                    barStyle={
                        Appearance.getColorScheme() === 'light'
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
