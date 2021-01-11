import React from 'react'
import { StyleSheet, View } from 'react-native'

const CONTAINER_PADDING = 60

function ContainerFluid(p) {
    const { style, ...props } = p
    return (
        <View style={{ ...styles.containerFluid, ...style }} {...props}>
            {props.children}
        </View>
    )
}

function Container(p) {
    const { style, ...props } = p
    return (
        <View style={{ ...styles.container, ...style }} {...props}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CONTAINER_PADDING,
    },
    containerFluid: {
        paddingHorizontal: CONTAINER_PADDING / 2,
    },
})

export default Container
export { ContainerFluid, CONTAINER_PADDING }
