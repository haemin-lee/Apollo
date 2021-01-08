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
        navigation.navigate('Home')
    }

    return (
        <>
            <View style={styles.sun} />
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
        </>
    )
}

const styles = StyleSheet.create({
    sun: {
        position: 'absolute',
        top: -50,
        left: -50,
        borderRadius: 110,
        width: 220,
        height: 220,
        backgroundColor: 'rgba(252, 255, 84, 0.8)',
    },
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
