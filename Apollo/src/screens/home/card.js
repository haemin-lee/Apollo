import React from 'react'
import { Appearance, StyleSheet, TouchableOpacity, View } from 'react-native'

import { ContainerFluid } from '@app/components/container'
import Text, { Subtext } from '@app/components/text'

import Color from '@app/theme/color.js'

function Card(props) {
    return (
        <ContainerFluid style={styles.container}>
            <TouchableOpacity>
                <View
                    style={{
                        backgroundColor:
                            Appearance.getColorScheme() === 'light'
                                ? Color.light.backgroundColor
                                : Color.dark.backgroundColor,
                        ...styles.card,
                        ...props.style,
                    }}
                >
                    <Text style={styles.name}>{props.data.name}</Text>

                    <Subtext>{props.data.appointment}</Subtext>
                    <Subtext>{props.data.address}</Subtext>

                    <Text>{props.data.notes}</Text>
                </View>
            </TouchableOpacity>
        </ContainerFluid>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    card: {
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    name: {
        fontWeight: 'bold',
    },
})

export default Card
