import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import Button from '@app/components/buttons'
import { LinkText, Subtext } from '@app/components/text'
import TextInput from '@app/components/text-input'

import get_client from '@app/api/apollo.js'

function Login({ styles, onLinkPress, onSubmit, onError }) {
    const [contact, setContact] = useState('test@test.com')
    const [pass, setPass] = useState('foobar')

    const login = async () => {
        try {
            const client = get_client()
            const user = await get_client().patients.login(contact, pass)
            const id = user.data.id
            onSubmit(user)
        } catch (e) {
            console.log(e)
            onError(e)
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Email/Phone"
                style={styles.formItem}
                value={contact}
                onChangeText={(t) => setContact(t)}
            />
            <TextInput
                placeholder="Password"
                style={styles.formItem}
                secureTextEntry={true}
                value={pass}
                onChangeText={(t) => setPass(t)}
            />
            <Button style={styles.formItem} onPress={login}>
                <Subtext style={styles.buttonText}>Login</Subtext>
            </Button>

            <TouchableOpacity style={styles.textButton} onPress={onLinkPress}>
                <LinkText>or sign up</LinkText>
            </TouchableOpacity>
        </View>
    )
}

export default Login
