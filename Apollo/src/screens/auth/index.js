import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'

import Container from '@app/components/container'
import Button from '@app/components/buttons'
import Text, {
    Header,
    Subheader,
    LinkText,
    Subtext,
} from '@app/components/text'
import TextInput from '@app/components/text-input'

import CreateAccount from './create-account'
import Login from './login'

function Auth() {
    const [screen, setScreen] = useState(false)

    const toggleScreen = () => {
        setScreen(!screen)
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
                    <Login styles={styles} onLinkPress={toggleScreen} />
                ) : (
                    <CreateAccount styles={styles} onLinkPress={toggleScreen} />
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
