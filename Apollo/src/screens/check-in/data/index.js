import React from 'react'
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useStore } from 'react-redux'

import AppleHealthKit from 'rn-apple-healthkit'

import LinearGradient from 'react-native-linear-gradient'

import Container from '@app/components/container'
import Text, { Header, Subheader, Subtext } from '@app/components/text'
import { RoundButton } from '@app/components/buttons'

import Color from '@app/theme/color.js'

import get_client from '@app/api/apollo.js'

function Data() {
    const navigation = useNavigation()
    const route = useRoute()

    const store = useStore()

    const getPermissions = async () => {
        const Permissions = AppleHealthKit.Constants.Permissions
        const healthKitOptions = {
            permissions: {
                read: [
                    Permissions.Steps,
                    Permissions.StepCount,
                    Permissions.BloodGlucose,
                    Permissions.BloodPressureDiastolic,
                    Permissions.BloodPressureSystolic,
                    Permissions.HeartRate,
                    Permissions.SleepAnalysis,
                    Permissions.DateOfBirth,
                    Permissions.Weight,
                    Permissions.Height,
                ],
            },
        }

        return new Promise((resolve) => {
            AppleHealthKit.initHealthKit(healthKitOptions, (err) => {
                if (err) console.log(err)

                resolve(AppleHealthKit)
            })
        })
    }

    const finish = () => {
        navigation.navigate('1')
    }

    const getStepData = (options = {}) => {
        return new Promise((resolve) => {
            AppleHealthKit.getDailyStepCountSamples(
                {
                    startDate: new Date(2020, 1, 1).toISOString(),
                    endDate: new Date().toISOString(),
                },
                async (err, result) => {
                    if (err)
                        return Alert.alert('Error', 'Something bad happened')
                    // post data
                    const user = store.getState().user
                    const client = get_client(user.data.id)
                    const item = store.getState().checkIn
                    console.log(item)

                    const doc = {
                        appointment: item.id,
                        patient: item.data.patient,
                        name: 'Steps',
                        data: result,
                        type: 'LINE_GRAPH',
                    }
                    const res = await client.appointments.post_appointment_document(
                        item.id,
                        doc
                    )

                    if (options._debug) {
                        console.log(result)
                        Alert.alert('Step Count', 'Yay got data')
                    }

                    resolve(res)
                }
            )
        })
    }

    const getHeartRateData = (options = {}) => {
        return new Promise((resolve) => {
            AppleHealthKit.getHeartRateSamples(
                {
                    startDate: new Date(2020, 1, 1).toISOString(),
                    endDate: new Date().toISOString(),
                },
                async (err, result) => {
                    if (err)
                        return Alert.alert('Error', 'Something bad happened')
                    // post data
                    const user = store.getState().user
                    const client = get_client(user.data.id)
                    const item = store.getState().checkIn

                    const doc = {
                        appointment: item.id,
                        patient: item.data.patient,
                        name: 'Heart Rate',
                        data: result,
                        type: 'LINE_GRAPH',
                    }
                    const res = await client.appointments.post_appointment_document(
                        item.id,
                        doc
                    )

                    if (options._debug) {
                        console.log(result)
                        Alert.alert('Heart Rate', 'Yay got data')
                    }
                    resolve(res)
                }
            )
        })
    }

    const getBloodPressureData = (options = {}) => {
        return new Promise((resolve) => {
            AppleHealthKit.getBloodPressureSamples(
                {
                    startDate: new Date(2020, 1, 1).toISOString(),
                    endDate: new Date().toISOString(),
                },
                async (err, result) => {
                    if (err)
                        return Alert.alert('Error', 'Something bad happened')
                    // post data
                    const user = store.getState().user
                    const client = get_client(user.data.id)
                    const item = store.getState().checkIn
                    console.log(item)

                    const doc = {
                        appointment: item.id,
                        patient: item.data.patient,
                        name: 'Blood Pressure',
                        data: result,
                        type: 'LINE_GRAPH',
                    }
                    const res = await client.appointments.post_appointment_document(
                        item.id,
                        doc
                    )
                    if (options._debug) {
                        console.log(result)
                        Alert.alert('Blood Pressure', 'Yay got data')
                    }
                    resolve(res)
                }
            )
        })
    }

    const getBloodGlucoseData = (options = {}) => {
        return new Promise((resolve) => {
            AppleHealthKit.getBloodGlucoseSamples(
                {
                    startDate: new Date(2020, 1, 1).toISOString(),
                    endDate: new Date().toISOString(),
                },
                async (err, result) => {
                    if (err)
                        return Alert.alert('Error', 'Something bad happened')
                    // post data
                    const user = store.getState().user
                    const client = get_client(user.data.id)
                    const item = store.getState().checkIn
                    console.log(item)

                    const doc = {
                        appointment: item.id,
                        patient: item.data.patient,
                        name: 'Blood Glucose',
                        data: result,
                        type: 'LINE_GRAPH',
                    }
                    const res = await client.appointments.post_appointment_document(
                        item.id,
                        doc
                    )
                    if (options._debug) {
                        console.log(result)
                        Alert.alert('Blood Pressure', 'Yay got data')
                    }
                    resolve(res)
                }
            )
        })
    }

    const getSleepData = (options = {}) => {
        return new Promise((resolve) => {
            AppleHealthKit.getSleepSamples(
                {
                    startDate: new Date(2020, 1, 1).toISOString(),
                    endDate: new Date().toISOString(),
                },
                async (err, result) => {
                    if (err)
                        return Alert.alert('Error', 'Something bad happened')
                    // post data
                    const user = store.getState().user
                    const client = get_client(user.data.id)
                    const item = store.getState().checkIn
                    console.log(item)

                    const doc = {
                        appointment: item.id,
                        patient: item.data.patient,
                        name: 'Sleep',
                        data: result,
                        type: 'LINE_GRAPH',
                    }
                    const res = await client.appointments.post_appointment_document(
                        item.id,
                        doc
                    )
                    if (options._debug) {
                        console.log(result)
                        Alert.alert('Sleep', 'Yay got data')
                    }
                    resolve(res)
                }
            )
        })
    }

    const getHealthData = async () => {
        await getPermissions()
        const options = {
            _debug: false,
        }

        await getStepData(options)
        await getHeartRateData(options)
        await getBloodPressureData(options)
        await getBloodGlucoseData(options)
        await getSleepData(options)
        Alert.alert(
            'Data Transferred',
            'Your doctor now has access to your most current Apple Health Data'
        )
        finish()
    }

    return (
        <LinearGradient
            style={styles.linearGradient}
            colors={Color.gradients.health}
        >
            <SafeAreaView style={styles.container}>
                <Container>
                    <View>
                        <View style={styles.promo}>
                            <Image
                                style={styles.healthKitLogo}
                                source={require('./apple-health.png')}
                            />
                            <Header>
                                Provide your doctor with Apple Health insights
                            </Header>
                            <Subtext>
                                Using Apollo with the Apple Health app empowers
                                your doctor with more relevant health data to
                                provide you better care and service
                            </Subtext>
                        </View>
                        <RoundButton
                            style={styles.button}
                            onPress={getHealthData}
                        >
                            <Text style={styles.buttonText}>
                                Sync Health Data
                            </Text>
                        </RoundButton>

                        <TouchableOpacity
                            style={styles.textButton}
                            onPress={finish}
                        >
                            <Subtext>Skip for now</Subtext>
                        </TouchableOpacity>
                    </View>
                </Container>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    healthKitLogo: {
        marginBottom: 10,
        width: 50,
        height: 50,
    },
    promo: {
        marginBottom: 30,
    },
    button: {
        backgroundColor: Color.light.backgroundColor,
    },
    buttonText: {
        color: Color.light.textColor,
    },
    textButton: {
        marginTop: 30,
        alignItems: 'center',
    },
})

export default Data
