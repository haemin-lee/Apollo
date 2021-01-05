import React from 'react'
import { Appearance, TextInput as RNTextInput, StyleSheet } from 'react-native'

import Color from '@app/theme/color.js'

function TextInput(p) {
    const { style, ...props } = p
    return (
        <RNTextInput
            style={{
                color:
                    Appearance.getColorScheme() === 'light'
                        ? Color.light.textColor
                        : Color.dark.textColor,
                backgroundColor:
                    Appearance.getColorScheme() === 'light'
                        ? Color.light.textInputBackgroundColor
                        : Color.dark.textInputBackgroundColor,
                ...styles.textInput,
                ...style,
            }}
            placeholderTextColor={
                Appearance.getColorScheme() === 'light'
                    ? Color.light.secondaryTextColor
                    : Color.dark.secondaryTextColor
            }
            textAlign="center"
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 5,
        padding: 14,
        fontFamily: 'Poppins',
        fontSize: 14,
    },
})

export default TextInput
