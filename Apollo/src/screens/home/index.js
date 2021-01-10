import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    useColorScheme,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Container, { ContainerFluid } from '@app/components/container'
import { Subtext, Header } from '@app/components/text'

import Color from '@app/theme/color.js'

import TabBar from './tab-bar'
import Card, { PastCard } from './card'

const DATA = [
    {
        id: 0,
        name: 'Dr Eduardo Saverin',
        appointment: 'Radiology',
        address: 'Somewhere Road, CA',
        scheduled_time: new Date().toISOString(),
        notes: 'I have a bladder infection',
    },
    {
        id: 1,
        name: 'Dr Eduardo Saverin',
        appointment: 'Radiology',
        address: 'Somewhere Road, CA',
        scheduled_time: new Date().toISOString(),
        notes: 'I have a bladder infection',
    },
    {
        id: 2,
        name: 'Dr Eduardo Saverin',
        appointment: 'Radiology',
        address: 'Somewhere Road, CA',
        scheduled_time: new Date().toISOString(),
        notes: 'I have a bladder infection',
    },
    {
        id: 3,
        name: 'Dr Eduardo Saverin',
        appointment: 'Radiology',
        address: 'Somewhere Road, CA',
        scheduled_time: new Date().toISOString(),
        notes: 'I have a bladder infection',
    },
    {
        id: 4,
        name: 'Dr Eduardo Saverin',
        appointment: 'Radiology',
        address: 'Somewhere Road, CA',
        scheduled_time: new Date().toISOString(),
        notes: 'I have a bladder infection',
    },
    {
        id: 5,
        name: 'Dr Eduardo Saverin',
        appointment: 'Radiology',
        address: 'Somewhere Road, CA',
        scheduled_time: new Date().toISOString(),
        notes: 'I have a bladder infection',
    },
    {
        id: 6,
        name: 'Dr Eduardo Saverin',
        appointment: 'Radiology',
        address: 'Somewhere Road, CA',
        scheduled_time: new Date().toISOString(),
        notes: 'I have a bladder infection',
    },
]

function Home() {
    const [active, setActive] = useState(0)
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])

    const colorScheme = useColorScheme()

    const navigation = useNavigation()

    const scrollY = useRef(new Animated.Value(0)).current

    useEffect(() => {
        setUpcomingAppointments(DATA)
        setPastAppointments(DATA.slice(0, 6))
    }, [])

    const ListHeaderComponent = () => (
        <ContainerFluid>
            <Header style={styles.header}>Your Appointments</Header>
            <TabBar
                active={active}
                onPress={() => {
                    setActive(!active)
                }}
                style={styles.tabBar}
            />
        </ContainerFluid>
    )

    const ListEmptyComponent = () => (
        <Container>
            <Subtext style={styles.empty}>
                There's nothing to see here...
            </Subtext>
        </Container>
    )

    const ListFooterComponent = () => (
        <Container>
            <Subtext style={styles.footer}>
                You can schedule an appointment through your doctor
            </Subtext>
        </Container>
    )

    const renderItem = ({ item }) =>
        !active ? (
            <Card
                data={item}
                onPress={() => {
                    navigation.navigate('Check In')
                }}
            />
        ) : (
            <PastCard data={item} />
        )

    return (
        <>
            <Animated.View
                style={{
                    ...styles.shadow,
                    backgroundColor:
                        colorScheme === 'light'
                            ? Color.light.backgroundColor
                            : Color.dark.backgroundColor,
                    shadowOpacity: scrollY.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 0.15],
                        extrapolate: 'clamp',
                    }),
                }}
            >
                <SafeAreaView style={styles.safeAreaView} />
            </Animated.View>
            <FlatList
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={ListEmptyComponent}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{
                    paddingBottom: 20,
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: scrollY,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: false }
                )}
                showsVerticalScrollIndicator={false}
                data={!active ? upcomingAppointments : pastAppointments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    shadow: {
        flex: 0,
        zIndex: 5,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
    },
    tabBar: {
        marginBottom: 20,
    },
    empty: {
        textAlign: 'center',
        marginBottom: 50,
    },
    footer: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
})

export default Home
