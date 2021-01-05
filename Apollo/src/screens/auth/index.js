import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Container from '@app/components/container'
import { Header, Subheader, Subtext } from '@app/components/text'

import CreateAccount from './create-account'
import Login from './login'

function Auth() {
    const [screen, setScreen] = useState(false)
    const navigation = useNavigation()

    const toggleScreen = () => {
        setScreen(!screen)
    }

    const onSubmit = () => {
        navigation.navigate('Check In')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Container style={styles.container}>
                <View style={{ ...styles.promo }}>
                    <Header>Apollo</Header>
                    <Subheader>Your Medical Companion</Subheader>

                    <Subtext>Some Promotional Text Goes Here</Subtext>
                </View>

                {!screen ? (
                    <Login
                        styles={styles}
                        onLinkPress={toggleScreen}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <CreateAccount
                        styles={styles}
                        onLinkPress={toggleScreen}
                        onSubmit={onSubmit}
                    />
                )}
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    promo: {
        marginBottom: 10,
    },
    formItem: {
        marginBottom: 10,
    },
    textButton: {
        marginTop: 10,
        alignItems: 'center',
    },
})

export default Auth
