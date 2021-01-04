import React from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    StatusBar,
    Pressable,
} from 'react-native'

import RootStackNavigator from '@app/navigation/RootStackNavigator.js'

function App() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <RootStackNavigator />
            </Pressable>
        </KeyboardAvoidingView>
    )
}

export default App
