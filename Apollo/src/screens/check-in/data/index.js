import React from 'react'
import {
    Alert,
    Appearance,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AppleHealthKit from 'rn-apple-healthkit'

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
        AppleHealthKit.getLatestHeight(null, (err, result) => {
            console.log(result)
            // console.log(result.value)
            Alert.alert(
                'Retrieved Apple Health Data',
                `Height: ${result.value}`
            )
            // finish()
        })
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor:
                    Appearance.getColorScheme() === 'light'
                        ? Color.light.accentColor
                        : Color.dark.accentColor,
                ...styles.container,
            }}
        >
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
                            Using Apollo with the Apple Health app empowers you
                            to copy the Apple interface guidelines
                        </Subtext>
                    </View>
                    <RoundButton onPress={getHealthData}>
                        <Text>Sync Health Data</Text>
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
    )
}

const styles = StyleSheet.create({
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
    textButton: {
        marginTop: 30,
        alignItems: 'center',
    },
})

export default Data
