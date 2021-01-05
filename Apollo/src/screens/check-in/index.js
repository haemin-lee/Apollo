import React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AppleHealthKit from 'rn-apple-healthkit'

import Container from '@app/components/container'
import Text, { Header, Subheader, Subtext } from '@app/components/text'
import { RoundButton } from '@app/components/buttons'

function CheckIn() {
    const navigation = useNavigation()

    const getPermissions = async () => {
        const Permissions = AppleHealthKit.Constants.Permissions
        const healthKitOptions = {
            permissions: {
                read: [Permissions.Age, Permissions.Weight],
            },
        }

        return new Promise((resolve) => {
            AppleHealthKit.initHealthKit(healthKitOptions, (err) => {
                resolve(AppleHealthKit)
            })
        })
    }

    const finish = () => {
        navigation.navigate('Auth')
    }

    const getHealthData = async () => {
        await getPermissions()
        finish()
    }

    return (
        <SafeAreaView style={styles.container}>
            <Container>
                <Text>Hello</Text>
                <RoundButton onPress={getHealthData}>
                    <Text>Sync Health Data</Text>
                </RoundButton>

                <TouchableOpacity onPress={finish}>
                    <Subtext>Skip for now</Subtext>
                </TouchableOpacity>
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default CheckIn
