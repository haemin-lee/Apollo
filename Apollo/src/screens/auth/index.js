import React from 'react'
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
    return (
        <SafeAreaView style={styles.container}>
            <Container style={styles.container}>
                <View style={{ ...styles.promo }}>
                    <Header>Apollo</Header>
                    <Subheader>Your Medical Companion</Subheader>

                    <Subtext>Some Promotional Text Goes Here</Subtext>
                </View>

                <View>
                    <TextInput
                        placeholder="Email/Phone"
                        style={styles.formItem}
                    />
                    <TextInput placeholder="Password" style={styles.formItem} />
                    <Button style={styles.formItem}>
                        <Subtext>Login</Subtext>
                    </Button>

                    <TouchableOpacity style={styles.textButton}>
                        <LinkText>or sign up</LinkText>
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
