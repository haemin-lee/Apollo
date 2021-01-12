import React from 'react'
import { useColorScheme, Text as RNText, StyleSheet } from 'react-native'

import Color from '@app/theme/color.js'

function Text(p) {
    const { style, ...props } = p
    const colorScheme = useColorScheme()

    return (
        <RNText
            style={{
                color:
                    colorScheme === 'light'
                        ? Color.light.textColor
                        : Color.dark.textColor,
                ...styles.text,
                ...style,
            }}
            {...props}
        >
            {props.children}
        </RNText>
    )
}

function Subtext(p) {
    const { style, ...props } = p
    const colorScheme = useColorScheme()

    return (
        <Text
            style={{
                color:
                    colorScheme === 'light'
                        ? Color.light.secondaryTextColor
                        : Color.dark.secondaryTextColor,
                ...styles.subtext,
                ...style,
            }}
            {...props}
        ></Text>
    )
}

function Header(p) {
    const { style, ...props } = p
    const colorScheme = useColorScheme()

    return (
        <Text
            style={{
                color:
                    colorScheme === 'light'
                        ? Color.light.textColor
                        : Color.dark.textColor,
                ...styles.header,
                ...style,
            }}
            {...props}
        ></Text>
    )
}

function Subheader(p) {
    const { style, ...props } = p
    const colorScheme = useColorScheme()

    return (
        <Text
            style={{
                color:
                    colorScheme === 'light'
                        ? Color.light.textColor
                        : Color.dark.textColor,
                ...styles.subheader,
                ...style,
            }}
            {...props}
        ></Text>
    )
}

function LinkText(p) {
    const { style, ...props } = p
    const colorScheme = useColorScheme()

    return (
        <Text
            style={{
                color:
                    colorScheme === 'light'
                        ? Color.light.linkTextColor
                        : Color.dark.linkTextColor,
                ...style,
            }}
            {...props}
        >
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins',
        fontSize: 14,
    },
    subtext: {
        fontFamily: 'Poppins',
        fontSize: 14,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 24,
    },
})

export default Text
export { Header, Subheader, Subtext, LinkText }
