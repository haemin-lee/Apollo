import React from 'react'
import { Appearance, StyleSheet, TouchableOpacity } from 'react-native'

import Color from '@app/theme/color.js'

function Button(props) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor:
                    Appearance.getColorScheme() === 'light'
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
    return (
        <Button
            style={{ ...styles.round, ...props.style }}
            onPress={props.onPress}
        >
            {props.children}
        </Button>
    )
}

function IconButton(props) {
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
    round: {},
    icon: {},
})

export default Button
export { RoundButton }
