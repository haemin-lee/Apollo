import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'

import Container, { ContainerFluid } from '@app/components/container'
import { Subtext, Header } from '@app/components/text'

import TabBar from './tab-bar'
import Card from './card'

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
    const [appointments, setAppointments] = useState([])

    const scrollY = useRef(new Animated.Value(0)).current

    useEffect(() => {
        setAppointments(DATA)
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
        <Subtext style={styles.empty}>There's nothing to see here...</Subtext>
    )

    const renderItem = ({ item }) => <Card data={item} />

    return (
        <>
            <Animated.View
                style={{
                    ...styles.shadow,
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
                ListFooterComponent={
                    <Container>
                        <Subtext style={styles.textCenter}>
                            You can schedule an appointment through your doctor
                        </Subtext>
                    </Container>
                }
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
                data={appointments}
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
    textCenter: {
        textAlign: 'center',
    },
})

export default Home
