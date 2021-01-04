import React from 'react'
import { StyleSheet, View } from 'react-native'

function Container(p) {
    const { style, ...props } = p
    return (
        <View style={styles.container} {...props}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 60,
    },
})

export default Container
