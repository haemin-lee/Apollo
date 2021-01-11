import React from 'react'
import {
    useColorScheme,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Data from '../screens/check-in/data'
import Photos from '../screens/check-in/photos'

import Text, { Header } from '../components/text'

import Color from '../theme/color'

const Tab = createMaterialTopTabNavigator()

function Ellipsis(props) {
    const colorScheme = useColorScheme()

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Header
                style={!props.active ? styles.ellipses : styles.activeEllipses}
            >
                .
            </Header>
        </TouchableOpacity>
    )
}

function TabBar(props) {
    const ellipses = props.state.routes.map((route: any, index: number) => {
        const isFocused = props.state.index === index

        function onPress() {
            const event = props.navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            })
            if (!isFocused && !event.defaultPrevented)
                props.navigation.navigate(route.name)
        }

        return <Ellipsis key={index} onPress={onPress} active={isFocused} />
    })

    function skip() {
        props.navigation.navigate('Home')
    }

    function next() {
        const next = props.state.index + 1
        if (next >= props.state.routes.length) return skip()
        props.navigation.navigate(next.toString())
    }

    return (
        <View style={styles.navContainer}>
            <View />
            <View style={styles.ellipsesContainer}>{ellipses}</View>
            <TouchableOpacity onPress={next}>
                <Text style={styles.next}>
                    {props.state.index + 1 === props.state.routes.length
                        ? 'Done'
                        : 'Next'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

function CheckInNavigator() {
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tab.Screen name="0" component={Data} />
            <Tab.Screen name="1" component={Photos} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        aspectRatio: 1,
        width: undefined,
        height: undefined,
    },
    textContainer: {
        marginLeft: 30,
        marginRight: 30,
        paddingTop: 30,
    },
    subtext: {
        width: '55%',
    },
    navContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 50,
        paddingRight: 60,
        paddingLeft: 60,
    },
    ellipsesContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeEllipses: {
        color: '#979797',
        lineHeight: 20,
        marginLeft: 2,
        marginRight: 2,
    },
    ellipses: {
        color: '#DADADA',
        lineHeight: 20,
        marginLeft: 2,
        marginRight: 2,
    },
    next: {
        // color: colors.primary,
    },
})

export default CheckInNavigator
