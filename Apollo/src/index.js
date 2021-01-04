import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    Text,
} from 'react-native'

import RootStackNavigator from '@app/navigation/RootStackNavigator.js'

function App() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <RootStackNavigator />
        </>
    )
}

export default App
