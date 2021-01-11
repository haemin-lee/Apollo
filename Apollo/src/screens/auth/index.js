import React, { useState } from 'react'
import {
    Alert,
    useColorScheme,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Container from '@app/components/container'
import { Header, Subheader, Subtext } from '@app/components/text'

import CreateAccount from './create-account'
import Login from './login'

import Color from '@app/theme/color.js'

function Auth() {
    const [screen, setScreen] = useState(false)
    const navigation = useNavigation()

    const colorScheme = useColorScheme()

    const toggleScreen = () => {
        setScreen(!screen)
    }

    const onSubmit = () => {
        navigation.navigate('Home')
    }

    const onError = (err) => {
        Alert.alert('Error', 'Invalid credentials')
    }

    return (
        <>
            <View
                style={{
                    backgroundColor:
                        colorScheme === 'light'
                            ? Color.light.sunColor
                            : Color.dark.sunColor,
                    ...styles.sun,
                }}
            />
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
                        onError={onError}
                    />
                ) : (
                    <CreateAccount
                        styles={styles}
                        onLinkPress={toggleScreen}
                        onSubmit={onSubmit}
                        onError={onError}
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
    buttonText: {
        color: Color.light.textColor,
    },
    textButton: {
        marginTop: 10,
        alignItems: 'center',
    },
})

export default Auth
