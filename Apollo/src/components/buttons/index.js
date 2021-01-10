import React from 'react'
import { useColorScheme, StyleSheet, TouchableOpacity } from 'react-native'

import Color from '@app/theme/color.js'

function Button(props) {
    const colorScheme = useColorScheme()
    return (
        <TouchableOpacity
            style={{
                backgroundColor:
                    colorScheme === 'light'
                        ? Color.light.accentColor
                        : Color.dark.accentColor,
                ...styles.button,
                ...props.style,
            }}
            onPress={props.onPress}
        >
            {props.children}
        </TouchableOpacity>
    )
}

function RoundButton(props) {
    const colorScheme = useColorScheme()
    return (
        <Button
            style={{
                color:
                    colorScheme === 'light'
                        ? Color.light.textColor
                        : Color.dark.textColor,
                backgroundColor:
                    colorScheme === 'light'
                        ? Color.light.backgroundColor
                        : Color.dark.backgroundColor,
                ...styles.round,
                ...props.style,
            }}
            onPress={props.onPress}
        >
            {props.children}
        </Button>
    )
}

function IconButton(props) {
    const colorScheme = useColorScheme()
    return (
        <Button
            style={{ ...styles.icon, ...props.style }}
            onPress={props.onPress}
        >
            {props.children}
        </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    round: { borderRadius: 25 },
    icon: {},
})

export default Button
export { RoundButton }
