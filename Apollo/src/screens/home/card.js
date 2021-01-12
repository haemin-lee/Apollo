import React from 'react'
import {
    useColorScheme,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    View,
} from 'react-native'

import { ContainerFluid } from '@app/components/container'
import Text, { LinkText, Subtext } from '@app/components/text'

import Color from '@app/theme/color.js'

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

function PastCard(props) {
    const colorScheme = useColorScheme()

    const date = new Date(props.data.scheduled_time)
    // Imagine writing date logic yourself bc you're dumb
    const month = MONTHS[date.getMonth()]
    const day = date.getDate()
    const hours =
        date.getHours() > 12
            ? date.getHours() - 12
            : date.getHours() === 0
            ? 12
            : date.getHours()
    const minutes =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const meridiem = date.getHours() > 12 ? 'pm' : 'am'

    return (
        <ContainerFluid style={styles.container}>
            <Pressable onPress={props.onPress}>
                <View
                    style={{
                        backgroundColor:
                            colorScheme === 'light'
                                ? Color.light.cardColor
                                : Color.dark.cardColor,
                        ...styles.card,
                        ...props.style,
                    }}
                >
                    <View
                        style={{
                            ...styles.info,
                            marginBottom: !props.data.notes ? 20 : 0,
                        }}
                    >
                        <View>
                            <Text style={styles.name}>{props.data.name}</Text>

                            <Subtext>{props.data.appointment}</Subtext>
                            <Subtext>{props.data.address}</Subtext>
                        </View>
                        <View style={styles.time}>
                            <Text>
                                {month} {day}
                            </Text>
                            <Text>
                                {hours}:{minutes} {meridiem}
                            </Text>
                        </View>
                    </View>

                    {props.data.notes && (
                        <Text style={styles.notes}>
                            Notes: {props.data.notes}
                        </Text>
                    )}
                </View>
            </Pressable>
        </ContainerFluid>
    )
}

function Card(props) {
    const colorScheme = useColorScheme()

    const date = new Date(props.data.scheduled_time)
    // Imagine writing date logic yourself bc you're dumb
    const month = MONTHS[date.getMonth()]
    const day = date.getDate()
    const hours =
        date.getHours() > 12
            ? date.getHours() - 12
            : date.getHours() === 0
            ? 12
            : date.getHours()
    const minutes =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const meridiem = date.getHours() > 12 ? 'pm' : 'am'

    return (
        <ContainerFluid style={styles.container}>
            <TouchableOpacity onPress={props.onPress}>
                <View
                    style={{
                        backgroundColor:
                            colorScheme === 'light'
                                ? Color.light.cardColor
                                : Color.dark.cardColor,
                        ...styles.card,
                        ...props.style,
                    }}
                >
                    <View
                        style={{
                            ...styles.info,
                            marginBottom: !props.data.notes ? 20 : 0,
                        }}
                    >
                        <View>
                            <Text style={styles.name}>{props.data.name}</Text>

                            <Subtext>{props.data.appointment}</Subtext>
                            <Subtext>{props.data.address}</Subtext>
                        </View>
                        <View style={styles.time}>
                            <Text>
                                {month} {day}
                            </Text>
                            <Text>
                                {hours}:{minutes} {meridiem}
                            </Text>
                        </View>
                    </View>

                    {props.data.notes && (
                        <Text style={styles.notes}>
                            Notes: {props.data.notes}
                        </Text>
                    )}

                    <LinkText style={styles.link}>Check in</LinkText>
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
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    time: {
        alignItems: 'flex-end',
    },
    name: {
        fontWeight: 'bold',
    },
    notes: {
        marginTop: 15,
        marginBottom: 15,
    },
    link: {
        alignSelf: 'flex-end',
    },
})

export default Card
export { PastCard }
