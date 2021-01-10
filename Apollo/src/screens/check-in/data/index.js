import React from 'react'
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AppleHealthKit from 'rn-apple-healthkit'

import LinearGradient from 'react-native-linear-gradient'

import Container from '@app/components/container'
import Text, { Header, Subheader, Subtext } from '@app/components/text'
import { RoundButton } from '@app/components/buttons'

import Color from '@app/theme/color.js'

function Data() {
    const navigation = useNavigation()

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
        navigation.navigate('Auth')
    }

    const getHealthData = async () => {
        await getPermissions()
        AppleHealthKit.getDailyStepCountSamples(
            {
                startDate: new Date(2020, 1, 1).toISOString(),
                endDate: new Date().toISOString(),
            },
            (err, result) => {
                console.log(result)
                Alert.alert('Step Count', 'Yay got data')
            }
        )
        // AppleHealthKit.getLatestHeight(null, (err, result) => {
        //     console.log(result)
        //     // console.log(result.value)
        //     Alert.alert(
        //         'Retrieved Apple Health Data',
        //         `Height: ${result.value}`
        //     )
        //     // finish()
        // })
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
                                you to copy the Apple interface guidelines
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
